import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ProductService } from '../../services/product';
import { FeedbackService } from '../../services/feedback';

@Component({
  selector: 'app-user-feedback',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-feedback.html',
  styleUrls: ['./user-feedback.css']
})
export class UserFeedback {
  feedbackForm: FormGroup;
  message = '';

  products: any[] = [];
  loadingProducts = false;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private feedbackService: FeedbackService,
    private cdr: ChangeDetectorRef
  ) {
    this.feedbackForm = this.fb.group({
      productId: ['', Validators.required],
      rating: ['', Validators.required],
      comments: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadingProducts = true;

    this.productService.getAll().subscribe({
      next: (res: any) => {
        this.products = Array.isArray(res) ? res : [];
        this.loadingProducts = false;

        this.cdr.detectChanges();
      },
      error: (err: any) => {
        this.loadingProducts = false;
        console.error('Failed to load products', err);
        this.cdr.detectChanges();
      }
    });
  }

  submitFeedback() {
    if (this.feedbackForm.invalid) return;

    const payload = {
      rating: Number(this.feedbackForm.value.rating),
      comments: String(this.feedbackForm.value.comments || '').trim(),
      product: {
        productId: Number(this.feedbackForm.value.productId)
      }
    };

    this.feedbackService.addFeedback(payload).subscribe({
      next: () => {
        this.message = 'Feedback submitted successfully!';
        this.feedbackForm.reset({ productId: '', rating: '', comments: '' });
      },
      error: (err: any) => {
        console.error(err);
        this.message = 'Failed to submit feedback';
      }
    });
  }
}
