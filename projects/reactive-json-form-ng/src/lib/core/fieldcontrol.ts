/*!
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class FieldControl {
  valid: Observable<any>;
  disabled: Observable<any>;

  constructor(public _control: AbstractControl) {
    this.valid = _control.statusChanges.pipe(map(status => status === 'VALID'));
    this.disabled = _control.statusChanges.pipe(map(status => status === 'DISABLED'));
  }
}
