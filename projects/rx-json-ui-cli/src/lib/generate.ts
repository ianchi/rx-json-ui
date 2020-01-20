/**
 * Copyright (c) 2019 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { generateSchemas } from './jsonschema';
import { getWidgets, ngCompile } from './metadata';

interface GenerateOptions {
  project: string;
  module: string;
  base: string;
}
export function generate(outPath: string, opts: GenerateOptions): void {
  const { program, config } = ngCompile(opts.project);
  if (!program) return process.exit(1);

  const [file, module] = opts.module.split('#');
  const widgets = getWidgets(program, file, module);
  if (!widgets.length) process.exit(1);

  generateSchemas(program.getTsProgram(), widgets, outPath, opts.base);

  process.exit(0);
}
