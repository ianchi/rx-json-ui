/**
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import {
  BinaryOperatorRule,
  IdentifierRule,
  IRuleSet,
  MEMBER_TYPE,
  MEMBER_TYPE_COMP,
  NumberRule,
  StringRule,
} from 'espression';
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
