/*!
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { JsonPath } from 'espression-jsonpath';
import * as fs from 'fs';
import * as path from 'path';
import resolve from 'resolve-from';
import * as ng from '@angular/compiler-cli';

const JP = new JsonPath();

const IMPORTS = {};

export function ngCompile(project: string = '.'): ng.Program {
  const config = ng.readConfiguration(project);
  const { diagnostics: compileDiags, program } = ng.performCompilation({
    rootNames: config.rootNames,
    options: config.options,
    emitFlags: config.emitFlags,
  });
  return program;
}
export function loadMetadata(fullPath) {
  if (IMPORTS[fullPath]) return IMPORTS[fullPath];

  const fileContent = fs.readFileSync(fullPath);

  let meta = JSON.parse(fileContent.toString());
  if (Array.isArray(meta)) meta = meta[0];

  meta.$base = path.dirname(fullPath);
  meta.$visited = [];
  IMPORTS[fullPath] = meta;

  return meta;
}

export function visitModule(meta, module, store) {
  if (meta.$visited.indexOf(module) >= 0) return;
  meta.$visited.push(module);

  const imports = JP.query(
    Array.isArray(meta) ? meta : [meta],
    `$[*].metadata["${module}"].decorators[?(@.expression.name=="NgModule")].arguments[*].imports[*]`
  ).values;

  // recourse for referenced imports
  JP.query(
    imports,
    `$[?(@.__symbolic=="reference" && @.module && !@.module.startsWith("@angular/"))]`
  ).values.forEach(element => {
    const parsedPath = path.parse(
      element.module === 'rx-json-ui'
        ? path.resolve('dist/rx-json-ui', 'rx-json-ui')
        : resolve(meta.$base, element.module)
    );
    const file = path.resolve(meta.$base, parsedPath.dir, parsedPath.name + '.metadata.json');
    visitModule(loadMetadata(file), element.name, store);
  });

  // recourse in local imports
  JP.query(imports, `$[?(@.__symbolic=="reference" && !@.module)]`).values.forEach(element =>
    visitModule(meta, element.name, store)
  );

  // widgets imports
  JP.query(
    imports,
    `$[?(@.__symbolic=="call" && @.expression.member=="forRoot" && @.expression.expression.name=="WidgetsCoreModule")]` +
      `.arguments[0].widgets[*]`
  ).values.forEach(element => {
    if (!store[element.type]) store[element.type] = element.component.name;
  });

  // TODO: follow other call imports & provider imports
}
