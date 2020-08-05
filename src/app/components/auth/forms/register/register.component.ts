import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, AsyncValidatorFn, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { BottomSheetComponent } from '../../bottom-sheet/bottom-sheet.component';
import { UserService } from 'src/app/core/services/user.service';
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  emailUnavaible = false;

  constructor(
    private bottomSheetRef: MatBottomSheetRef<BottomSheetComponent>,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.maxLength(100),
        this.emailValidator(),
      ]),
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(100),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        this.checkPassword,
      ]),
      avatar: new FormControl('', [
        RxwebValidators.image({ maxHeight: 1000, maxWidth: 1000 }),
        RxwebValidators.extension({ extensions: ['jpeg', 'gif', 'png', 'jpg'] })
      ]),
    });
  }

  emailValidator(): ValidatorFn {
    return (control: AbstractControl): { [emailExists: string]: boolean} | null => {
      return this.emailUnavaible ? { emailExists: true } : null;
    };
  }

  checkPassword(group: FormGroup): null | {[key: string]: boolean} {
    let valid = false;

    if (group.parent && group.parent.controls) {
      const controls = group.parent.controls as any;
      valid = controls.password.value === group.value;
    }

    return valid ? null : { notSame: true };
  }

  onSubmit(): void {
    this
    .userService
    .register(this.registerForm.getRawValue())
    .then(res => {
      this.onCancel();
    })
    .catch(err => {
      if (err.code === 'auth/email-already-in-use') {
        this.emailUnavaible = true;
        this.registerForm.controls.email.updateValueAndValidity();
      }
    });
  }

  hasError(controlName: string, errorName: string): boolean {
    if (!this.registerForm.controls.avatar.errors) {
      this.registerForm.controls.avatar.setErrors(null);
    }
    this.emailUnavaible = false;
    return this.registerForm.controls[controlName].hasError(errorName);
  }

  onCancel(): void {
    // this.registerForm.reset();
    this.bottomSheetRef.dismiss();
  }

}
