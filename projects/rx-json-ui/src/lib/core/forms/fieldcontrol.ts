/*!
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { AbstractControl } from '@angular/forms';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

export class FieldControl {
  valid: Observable<boolean>;
  disabled: Observable<boolean>;
  private _subscription: Subscription | undefined;

  constructor(public _control: AbstractControl) {
    // use BehaviorSubject to emmit initial state
    const validSubject = new BehaviorSubject(_control.valid);
    const disabledSubject = new BehaviorSubject(_control.valid);

    this._subscription = _control.statusChanges.subscribe(status => {
      validSubject.next(status === 'VALID');
      disabledSubject.next(status === 'DISABLED');
    });
    this.valid = validSubject.asObservable();
    this.disabled = disabledSubject.asObservable();
  }

  destroy(): void {
    if (this._subscription) {
      this._subscription.unsubscribe();
      this._subscription = undefined;
    }
  }
}
