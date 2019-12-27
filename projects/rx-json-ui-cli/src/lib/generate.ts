/**
 * Copyright (c) 2019 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { generateSchemas } from './jsonschema';
import { getWidgets, ngCompile } from './metadata';

const { program, config } = ngCompile('./src');
if (!program) process.exit(1);

const widgets = getWidgets(program, 'src/app/app.module', 'AppModule');
if (!widgets.length) process.exit(1);

generateSchemas(program.getTsProgram(), widgets);

console.log('end');
