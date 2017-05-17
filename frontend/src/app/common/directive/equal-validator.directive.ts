import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { Attribute, Directive, forwardRef } from '@angular/core';
/**
 * 两个关联的值进行比较，比如说密码和重复输入密码
 * 密码：reverse='true'
 * 重复密码：reverse='false'
 * Created by maxu0 on 2017/5/11.
 */
@Directive({
  selector: '[equalValidate][formControlName],[equalValidate][formControl],[equalValidate][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => EqualValidatorDirective), multi: true }
  ]
})
export class EqualValidatorDirective implements Validator {

  constructor(
    @Attribute('equalValidate') private equalValidate: string,
    @Attribute('reverse') private reverse: string
  ) { }

  private isReverse(): boolean {
    if(!this.reverse) {
      return false;
    }
    return this.reverse === 'true' ? true: false;
  }

  validate(c: AbstractControl): ValidationErrors | any {
    // self value
    let selfVal = c.value;

    // control vlaue
    let equalTo = c.root.get(this.equalValidate);

    // value not equal
    if (equalTo && selfVal !== equalTo.value && !this.isReverse()) {
      return {
        validateEqual: false
      }
    }

    // value equal and reverse
    if (equalTo && selfVal === equalTo.value && this.isReverse()) {
      delete equalTo.errors['validateEqual'];
      if (!Object.keys(equalTo.errors).length) {
        equalTo.setErrors(null);
      }
    }

    // value not equal and reverse
    if (equalTo && selfVal !== equalTo.value && this.isReverse()) {
      equalTo.setErrors({
        validateEqual: false
      })
    }

    return null;
  }
}