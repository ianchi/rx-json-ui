/*!
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import * as ngc from '@angular/compiler';
import * as ng from '@angular/compiler-cli';

export interface WidgetRef {
  type: string;
  component: ng.StaticSymbol;
}

export function ngCompile(
  project: string = '.'
): { program: ng.Program; config: ng.ParsedConfiguration } {
  const config = ng.readConfiguration(project);

  if (config.errors.length) {
    console.error('Error reading project configuration');
    console.error(ng.formatDiagnostics(config.errors));
    return { program: undefined, config };
  }
  console.log('Compiling application...');
  const { diagnostics, program } = ng.performCompilation(config);

  if (diagnostics.length) {
    console.error('Errors compiling application');
    console.error(ng.formatDiagnostics(diagnostics));
    return { program: undefined, config };
  }

  console.log('Compiled OK');

  return { program, config };
}
export function getWidgets(program: ng.Program, file: string, module: string): WidgetRef[] {
  // UNSAFE: Access private properties
  const compiler: ngc.AotCompiler = (program as any).compiler;
  const modules: ngc.NgAnalyzedModules = (program as any).analyzedModules;

  const configToken = compiler.reflector.findDeclaration('rx-json-ui', 'AF_CONFIG_TOKEN');
  let entryToken: ngc.StaticSymbol;

  try {
    entryToken = compiler.reflector.findDeclaration(file, module);
  } catch (e) {
    console.error(e.message);
    return [];
  }
  const meta = modules.ngModules.filter(m => m.type.reference === entryToken);

  if (!meta.length) {
    console.error(`Module ${module} not found`);
    return [];
  } else if (meta.length > 1) {
    console.error(`Found ${meta.length} modules with name ${module}`);
    return [];
  }

  const providers = meta[0].transitiveModule.providers.filter(
    p => ngc.tokenReference(p.provider.token) === configToken
  );
  const widgets = providers.reduce((acum, mod) => acum.concat(mod.provider.useValue.widgets), []);
  console.log(`Found ${widgets.length} widgets from ${providers.length} transitive modules`);

  return widgets;
}
