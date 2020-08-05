import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, Validators, AsyncValidatorFn, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { BottomSheetComponent } from '../../bottom-sheet/bottom-sheet.component';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error = false;

  constructor(
    private bottomSheetRef: MatBottomSheetRef<BottomSheetComponent>,
    private userService: UserService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('admin@admin.com', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('123123', [
        Validators.required,
      ]),
    });
  }

  onSubmit(): void {
    const formData = this.loginForm.getRawValue();

    this.userService.login(formData.email, formData.password).subscribe(
    res => {
      this.error = false;
      this.onCancel();
    },
    err => {
      this.error = true;
      this.cd.markForCheck();
    },
    () => this.cd.markForCheck()
    );
  }

  hasError(controlName: string, errorName: string): boolean {
    return this.loginForm.controls[controlName].hasError(errorName);
  }

  onCancel(): void {
    // this.loginForm.reset();
    this.bottomSheetRef.dismiss();
  }


}
