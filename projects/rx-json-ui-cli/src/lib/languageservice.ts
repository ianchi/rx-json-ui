/**
 * Copyright (c) 2019 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import {
  BinaryOperatorRule,
  ES6Parser,
  IdentifierRule,
  IRuleSet,
  MEMBER_TYPE,
  MEMBER_TYPE_COMP,
  NumberRule,
  Parser,
  StringRule,
  toRawPosition,
} from 'espression';
import {
  ArrayASTNode,
  ASTNode,
  Diagnostic,
  DiagnosticSeverity,
  Hover,
  JSONDocument,
  LanguageService,
  Position,
  Range,
  TextDocument,
  Thenable,
} from 'vscode-json-languageservice';

// import { lvalueRule } from '../../../rx-json-ui/src/lib/core/expressions/expressionProvider';

export function lvalueRule(): IRuleSet {
  return {
    lvalue: [
      new BinaryOperatorRule({
        '.': MEMBER_TYPE,
        '[': { ...MEMBER_TYPE_COMP, subRules: 'computed' },
      }),
      'identifier',
    ],
    identifier: [new IdentifierRule({ reserved: ['this', 'true', 'false'] })],
    computed: [new StringRule(), new NumberRule(), 'identifier'],
    property: [new IdentifierRule()],
  };
}

const esParser = new ES6Parser(true);
const rules = { string: [new StringRule({ LT: false, hex: true, raw: false, escapes: true })] };
const stringParser = new Parser(rules, 'string');
const lvalueParser = new Parser(lvalueRule(), 'lvalue');

export function hoverData(
  languageservice: LanguageService,
  textDocument: TextDocument,
  jsonDocument: JSONDocument,
  position: Position
): Thenable<Hover | null> {
  return languageservice.getMatchingSchemas(textDocument, jsonDocument).then(matchingSchemas => {
    if (!matchingSchemas.length) return null;

    const offset = textDocument.offsetAt(position);
    const node = jsonDocument.getNodeFromOffset(offset);
    if (!node) return null;

    let markdown = getContent(node);

    if (node.type === 'string' && node.parent && node.parent.type === 'array')
      markdown = markdown.concat(getContent(node.parent));

    function getContent(nodeAST: ASTNode): string[] {
      const content: string[] = [];

      matchingSchemas.forEach((s: any) => {
        if (s.node === nodeAST && !s.inverted && s.schema && s.schema.parser) {
          content.push(
            // tslint:disable-next-line: prefer-template
            `#### ${s.schema.parser} Expression\n\n` + '```js\n' + getCookedExpr(nodeAST) + '\n```'
          );
        }
      });
      return content;
    }

    const hoverRange = Range.create(
      textDocument.positionAt(node.offset),
      textDocument.positionAt(node.offset + node.length)
    );

    if (!markdown) return null;
    return {
      contents: markdown,
      range: hoverRange,
    } as Hover;
  });
}

export function validateExpr(
  languageservice: LanguageService,
  textDocument: TextDocument,
  jsonDocument: JSONDocument
): Thenable<Diagnostic[]> {
  return languageservice.getMatchingSchemas(textDocument, jsonDocument).then(matchingSchemas => {
    const toValidate = matchingSchemas.filter((n: any) => n.schema.parser);
    const diagnostics: Diagnostic[] = [];

    const added: { [signature: string]: boolean } = {};
    const addProblem = (problem: Diagnostic) => {
      // remove duplicated messages
      const signature =
        // tslint:disable-next-line: prefer-template
        problem.range.start.line + ' ' + problem.range.start.character + ' ' + problem.message;
      if (!added[signature]) {
        added[signature] = true;
        diagnostics.push(problem);
      }
    };

    toValidate.forEach((n: any) => {
      try {
        const expr = getCookedExpr(n.node);
        if (n.schema.parser === 'ES6') esParser.parse(expr);
        else if (n.schema.parser === 'lvalue') lvalueParser.parse(expr);
      } catch (err) {
        const raw = getRawExpr(textDocument, n.node);

        const ast = stringParser.parse(raw);
        const rawPos = toRawPosition(ast, err.position);
        let range: Range;

        if (n.node.type === 'string')
          range = Range.create(
            textDocument.positionAt(n.node.offset + 1 + rawPos),
            textDocument.positionAt(n.node.offset + n.node.length - 1)
          );
        else range = toArrayPostion(n.node, rawPos);

        addProblem(
          Diagnostic.create(
            range,
            err.description || err.message,
            DiagnosticSeverity.Error,
            'expr',
            'expression'
          )
        );

        // convert from raw to array

        function toArrayPostion(node: ArrayASTNode, pos: number): Range {
          let offset = pos - 1;
          pos = node.offset + 1;

          let i: ASTNode;
          for (i of node.items) {
            pos = i.offset + 1;
            if (i.length - 1 < offset) offset -= i.length - 1;
            else break;
          }
          const last = node.items[node.items.length - 1];
          const start = pos + offset;
          const end = last.offset + last.length - 1;

          return Range.create(
            textDocument.positionAt(start),
            textDocument.positionAt(end === start ? end + 1 : end)
          );
        }
      }
    });

    return diagnostics;
  });
}

function getRawExpr(textDocument: TextDocument, node: ASTNode): string {
  let raw = '';

  if (node.type === 'string')
    raw = textDocument.getText().substring(node.offset, node.offset + node.length);
  else if (node.type === 'array' && node.items) {
    raw = `"${(node as ArrayASTNode).items
      .map(i => textDocument.getText().substring(i.offset + 1, i.offset + i.length - 1))
      .join('')}"`;
  }

  return raw;
}

function getCookedExpr(node: ASTNode): string {
  let expr = '';

  if (node.type === 'string') {
    expr = node.value;
  } else if (node.type === 'array' && node.items) {
    expr = (node as ArrayASTNode).items.map(i => (i.type === 'string' ? i.value : '')).join('\n');
  }
  return expr;
}
