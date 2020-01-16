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
): { program: ng.Program | undefined; config: ng.ParsedConfiguration } {
  const config = ng.readConfiguration(project);
  config.options.enableIvy = false;
  config.options.noUnusedLocals = false;
  config.options.noUnusedParameters = false;

  if (config.errors.length) {
    console.error('Error reading project configuration');
    console.error(ng.formatDiagnostics(config.errors));
    return { program: undefined, config };
  }
  console.log('Compiling application...');
  const program = ng.createProgram({
    rootNames: config.rootNames,
    host: ng.createCompilerHost({ options: config.options }),
    options: config.options,
  });
  let diagnostics = program.getTsSyntacticDiagnostics();
  diagnostics = diagnostics.concat(program.getTsSemanticDiagnostics());

  if (diagnostics.length) {
    console.error(ng.formatDiagnostics(diagnostics));
    return { program: undefined, config };
  }

  console.log('Compiled OK');
  return { program, config };
}
export function getWidgets(program: ng.Program, file: string, module: string): WidgetRef[] {
  // UNSAFE: Access private properties
  const compiler: ngc.AotCompiler = (program as any).compiler;
  const staticSymbolResolver: ngc.StaticSymbolResolver = (compiler as any)._symbolResolver;
  const metadataResolver: ngc.CompileMetadataResolver = (compiler as any)._metadataResolver;
  const compilerHost: ngc.AotCompilerHost = (compiler as any)._host;

  const configToken = compiler.reflector.findDeclaration('rx-json-ui', 'AF_CONFIG_TOKEN');
  let entryToken: ngc.StaticSymbol;
  const filePath = compilerHost.moduleNameToFileName(file);

  if (!filePath) {
    console.error(`Could not resolve ${file}`);
    return [];
  }
  const modules = ngc.analyzeFile(compilerHost, staticSymbolResolver, metadataResolver, filePath);
  let meta = modules.ngModules;
  if (module) {
    try {
      entryToken = compiler.reflector.findDeclaration(file, module);
    } catch (e) {
      console.error(e.message);
      return [];
    }
    meta = meta.filter(m => m.type.reference === entryToken);
  }

  if (!meta || !meta.length) {
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
