import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth';

type ToastType = 'success' | 'danger';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})



export class LoginComponent {

  loading = false;
  errorMsg = '';
  form!: FormGroup;

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
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

showPassword = false;

togglePasswordVisibility() {
  this.showPassword = !this.showPassword;
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
    // this.errorMsg = '';
    if (this.form.invalid) return;

    this.loading = true;
    const email = this.form.value.email!;
    const password = this.form.value.password!;

    this.auth.login(email, password).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate([this.auth.isAdmin() ? '/admin' : '/user']);
      },
      error: (err) => {
        this.loading = false;
        const msg = err?.error?.message || 'Login failed. Please try again.';
        this.showToast(msg, 'danger');
      }
    });
  }
}
