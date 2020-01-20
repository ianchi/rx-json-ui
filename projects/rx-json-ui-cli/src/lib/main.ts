/*!
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import program from 'commander';
import * as path from 'path';
import { sync as readPkg } from 'read-pkg-up';

import { generate } from './generate';
import { validate } from './vscode';

export function main(args: string[]): void {
  configure();
  program.parse(args);
  if (!program.args.length) program.help();
}

function configure(): void {
  const pkg = readPkg({ cwd: path.dirname(module.filename) });

  program
    .name('rx-json-ui')
    .version((pkg && pkg.packageJson.version) || '0.0.0')
    .description('Tool to generate json schema validation for rx-json-ui widgets definitions');

  program
    .command('generate <outPath>')
    .alias('g')
    .description('Generate json schema for all widgets provided in specified module')
    .requiredOption(
      '-p, --project <dir>',
      'Location of the tsconfig.json file to use to compile the application'
    )
    .requiredOption(
      '-m, --module <ngModule>',
      'Ng Module to start extracting widget definitions. Must be in the form "fileModule(#ngModuleSymbol)". If Symbol is ommited all NgModules in the file are considered'
    )
    .option(
      '-b, --base <uri>',
      'Base URI to use for generating the schmas $ID',
      'http://ianchi.github.io/rx-json-ui'
    )
    .action(generate);

  program
    .command('lint <glob...>')
    .alias('l')
    .description(
      'Validate widget definitions, adding expression syntactic validation to the json schema validation'
    )
    .requiredOption('-s, --schema <file>', 'Schema to validate against')
    .action(validate);
  program.on('command:*', (cmd, _opts) => {
    console.error(
      `The specified command ("${cmd[0]}") is invalid. For a list of available options, run "rx-json-ui --help".`
    );
    process.exit(1);
  });
}
