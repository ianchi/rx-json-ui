/**
 * Copyright (c) 2019 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

/**
 * Module provides json schema validation functions.
 * It uses the same package as VSCode.
 */

import * as fs from 'fs';
import * as path from 'path';
import { getErrorStatusDescription, xhr, XHRResponse } from 'request-light';
import * as URL from 'url';
import {
  ClientCapabilities,
  Diagnostic,
  DocumentLanguageSettings,
  getLanguageService,
  JSONDocument,
  LanguageService,
  SchemaRequestService,
  TextDocument,
  Thenable,
} from 'vscode-json-languageservice';
import { URI } from 'vscode-uri';

import { validateExpr } from './languageservice';

const languageService = getLanguageService({
  schemaRequestService: getSchemaRequestService(),
  workspaceContext: {
    resolveRelativePath: (relativePath: string, resource: string) => {
      return URL.resolve(resource, relativePath);
    },
  },
  contributions: [],
  clientCapabilities: ClientCapabilities.LATEST,
});

languageService.configure({
  allowComments: false,
  validate: true,
  schemas: [
    {
      fileMatch: ['src/assets/views/*'],
      uri: URI.file(path.resolve('./dist/jsonschema/AppWidgetDef.schema.json')).toString(),
    },
  ],
});

export function validate(file: string): Thenable<Diagnostic[]> {
  const content = fs.readFileSync(file);
  const textDocument = TextDocument.create(
    URI.file(file).toString(),
    'json',
    1,
    content.toString()
  );
  const jsonDocument: any = languageService.parseJSONDocument(textDocument);

  return Promise.all([
    validateSchema(languageService, textDocument, jsonDocument),
    validateExpr(languageService, textDocument, jsonDocument),
  ]).then(([schema, expr]) => schema.concat(expr));
}
export function validateSchema(
  languageservice: LanguageService,
  textDocument: TextDocument,
  jsonDocument: JSONDocument
): Thenable<Diagnostic[]> {
  const documentSettings: DocumentLanguageSettings = { comments: 'error', trailingCommas: 'error' };
  return languageService.doValidation(textDocument, jsonDocument, documentSettings);
}

function getSchemaRequestService(
  handledSchemas: string[] = ['https', 'http', 'file']
): (uri: string) => Thenable<string> {
  const builtInHandlers: { [protocol: string]: SchemaRequestService } = {};
  for (const protocol of handledSchemas) {
    if (protocol === 'file') {
      builtInHandlers[protocol] = fileRequestService;
    } else if (protocol === 'http' || protocol === 'https') {
      builtInHandlers[protocol] = httpRequestService;
    }
  }
  return (uri: string): Thenable<string> => {
    const protocol = uri.substr(0, uri.indexOf(':'));

    const builtInHandler = builtInHandlers[protocol];
    if (builtInHandler) {
      return builtInHandler(uri);
    }
    throw new Error(`Unhandled URI protocol "${protocol}"`);
  };
}

function fileRequestService(uri: string): Promise<string> {
  const fsPath = URI.parse(uri).fsPath;
  return new Promise<string>((c, e) => {
    fs.readFile(fsPath, 'UTF-8', (err, result) => {
      err ? e(err.message || err.toString()) : c(result.toString());
    });
  });
}

function httpRequestService(uri: string): Promise<string> {
  const headers = { 'Accept-Encoding': 'gzip, deflate' };
  return xhr({ url: uri, followRedirects: 5, headers }).then(
    response => {
      return response.responseText;
    },
    (error: XHRResponse) => {
      return Promise.reject(
        error.responseText || getErrorStatusDescription(error.status) || error.toString()
      );
    }
  );
}