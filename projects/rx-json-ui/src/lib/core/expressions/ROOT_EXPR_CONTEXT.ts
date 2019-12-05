/**
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { InjectionToken } from '@angular/core';

import { Context } from './context';

/** Injection token used to provide the default root context for widgets */
export const ROOT_EXPR_CONTEXT = new InjectionToken<Context>('Widgets Root Context');
