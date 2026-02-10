import { Component, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { AuthService } from '../../services/auth';

type ToastType = 'success' | 'danger';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {

  form!: FormGroup;
  message = '';
  loading = false;

  toastMsg = '';
  toastType: ToastType = 'success';
  private toastTimer: any = null;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {

    this.form = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

  }

  private showToast(message: string, type: ToastType = 'success', ms = 2500) {
    this.toastMsg = message;
    this.toastType = type;

    if (this.toastTimer) clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => {
      this.toastMsg = '';
      this.cdr.detectChanges();
    }, ms);

    this.cdr.detectChanges();
  }

submit() {
  if (this.form.invalid) return;

  this.loading = true;
  const { fullName, email, password } = this.form.value;

  this.auth.register(fullName!, email!, password!).subscribe({
    next: () => {
      this.handleSuccess();
    },
    error: (err) => {
      this.loading = false;

      
      if (err.status === 200 || err.status === 201) {
        this.handleSuccess();
        return;
      }

      
      const rawError = typeof err.error === 'string' 
        ? err.error 
        : (err?.error?.message || err?.message || '');

      let friendlyMessage = 'Registration failed. Please try again.';

      if (rawError.toLowerCase().includes('duplicate entry')) {
        friendlyMessage = 'This email is already registered. Please try logging in.';
      } else if (err.status === 500) {
        friendlyMessage = 'Server Error: The database could not be reached.';
      }

      this.showToast(friendlyMessage, 'danger');
      this.cdr.detectChanges();
    }
  });
}


private handleSuccess() {
  this.loading = false;
  this.showToast('Registration successful! Redirecting to login...', 'success');
  this.cdr.detectChanges();
  setTimeout(() => this.router.navigate(['/login']), 2000);
}
}
