import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly routes = inject(Router);
  private subscriptions: Subscription = new Subscription();

  isLoding: boolean = false;
  accountExists: string = '';
  successMessage: string = '';
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-Z]\w{7,}$/),
    ]),
  });
  submitForm(): void {
    if (this.loginForm.valid) {
      this.isLoding = true;
      this.authService.sendDataLoginForm(this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this.isLoding = false;
          if (res.message === 'success') {
            setTimeout(() => {
              localStorage.setItem('userToken', res.token);
              this.authService.saveUserToken();

              this.routes.navigate(['/home']);
            }, 500);
            this.successMessage = res.message;
          }
        },
        error: (err) => {
          console.log(err);
          this.isLoding = false;
          this.accountExists = err.error.message;
        },
      });
    }
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
