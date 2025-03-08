import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { of, delay, Subscription } from 'rxjs';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgetpassword',
  imports: [ReactiveFormsModule],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.css',
})
export class ForgetpasswordComponent {
  private subscriptions: Subscription = new Subscription();
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  step: Number = 1;
  isSuccess: boolean = false;
  isSuccess2: boolean = false;
  isSuccess3: boolean = false;
  isError: boolean = false;
  isError2: boolean = false;
  isError3: boolean = false;
  successMessage: string = '';
  successMessage2: string = '';
  successMessage3: string = '';
  errorMessage: string = '';
  errorMessage2: string = '';
  errorMessage3: string = '';
  verifyEmail: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });
  verifyCode: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[0-9]{6}$/),
    ]),
  });
  resetPassword: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-Z]\w{7,}$/),
    ]),
  });
  //================================================================
  onSubmit() {
    // Check if the form is invalid
    if (this.verifyEmail.invalid) {
      this.isError = true;
      this.errorMessage = 'Please enter a valid email address.';
      return;
    }

    let emailValue = this.verifyEmail.get('email')?.value;
    this.resetPassword.get('email')?.patchValue(emailValue);
    // Simulate an API call

    this.authService.setEmailvarify(this.verifyEmail.value).subscribe({
      next: (res) => {
        if (res.statusMsg === 'success') {
          this.step = 2;
          this.isSuccess = true;
          this.isError = false;
          console.log(res);

          this.successMessage = res.message;
        }
      },
      error: (err) => {
        console.log(err);

        this.isError = true;
        this.isSuccess = false;
        this.errorMessage = err.error.message;
      },
    });
  }

  /* =========================   verify Code =================================== */
  onSubmitverify() {
    if (this.verifyCode.invalid) {
      return;
    }
    this.authService.setCodevarify(this.verifyCode.value).subscribe({
      next: (res) => {
        if (res.status === 'Success') {
          console.log(res);

          this.step = 3;
          this.isSuccess2 = true;
          this.isError2 = false;
          this.successMessage2 = res.status;
        }
      },
      error: (err) => {
        console.log(err);

        this.isError2 = true;
        this.isSuccess2 = false;
        this.errorMessage2 = err.error.message;
      },
    });
  }
  /* ======================= RestPassword=================================*/
  onSubmitPass() {
    if (this.resetPassword.invalid) {
      return;
    }
    this.authService.setRestpasswordvarify(this.resetPassword.value).subscribe({
      next: (res) => {
        localStorage.setItem('userToken', res.token);
        this.authService.saveUserToken();
        this.router.navigate(['/home']);
        console.log(res);

        this.isSuccess3 = true;
        this.isError3 = false;
        this.successMessage3 = res.message;
      },
      error: (err) => {
        console.log(err);

        this.isError3 = true;
        this.isSuccess3 = false;
        this.errorMessage3 = err.message;
      },
    });
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
