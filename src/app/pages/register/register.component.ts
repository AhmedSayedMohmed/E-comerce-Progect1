import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private readonly authService = inject(AuthService);
  private readonly routes = inject(Router);
  isLoding: boolean = false;
  accountExists: string = '';
  successMessage: string = '';
  private subscriptions: Subscription = new Subscription();

  private readonly formBuilder = inject(FormBuilder);
  register: FormGroup = this.formBuilder.group(
    {
      name: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      email: [null, [Validators.required, Validators.email]],
      password: [
        null,
        [Validators.required, Validators.pattern(/^[A-Z]\w{7,}$/)],
      ],
      rePassword: [null, [Validators.required]],
      phone: [
        null,
        [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
      ],
    },
    { Validators: this.confairmePassword }
  );

  submitForm(): void {
    if (this.register.valid) {
      this.isLoding = true;
      this.authService.sendDataRegsiterForm(this.register.value).subscribe({
        next: (res) => {
          console.log(res);
          this.isLoding = false;
          if (res.message === 'success') {
            setTimeout(() => {
              this.routes.navigate(['/Login']);
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
    } else {
      this.register.markAllAsTouched();
    }
  }
  confairmePassword(group: AbstractControl) {
    const password = group.get('password')?.value;
    const rePassword = group.get('rePassword')?.value;
    return password === rePassword ? null : { mismatch: true };
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
