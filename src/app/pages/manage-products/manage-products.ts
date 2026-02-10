import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ProductService, Product } from '../../services/product';

type ToastType = 'success' | 'danger';

@Component({
  selector: 'app-manage-products',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './manage-products.html',
  styleUrls: ['./manage-products.css']
})
export class ManageProducts {
  loading = false;

  products: Product[] = [];
  editingId: number | null = null;

  form!: FormGroup;

  
  toastMsg = '';
  toastType: ToastType = 'success';
  private toastTimer: any = null;

 
  removeTarget: Product | null = null;
  removing = false;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private cdr: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: ['']
    });
  }

  ngOnInit() {
    this.loadProducts();
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

  loadProducts() {
    this.loading = true;
    this.cdr.detectChanges();

    this.productService.getAll().subscribe({
      next: (res: Product[]) => {
        this.products = res || [];
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (e: any) => {
        this.loading = false;
        this.showToast(e?.error?.message || 'Failed to load products.', 'danger');
      }
    });
  }

  startAdd() {
    this.editingId = null;
    this.form.reset({ name: '', description: '' });
  }

  startEdit(p: Product) {
    this.editingId = p.productId;
    this.form.setValue({
      name: p.name || '',
      description: p.description || ''
    });
  }

  cancelEdit() {
    this.startAdd();
  }

  submit() {
    if (this.form.invalid) {
      this.showToast('Please fill the required fields correctly.', 'danger');
      return;
    }

    const payload = {
      name: String(this.form.value.name || '').trim(),
      description: String(this.form.value.description || '').trim()
    };

    this.loading = true;
    this.cdr.detectChanges();

  
    if (!this.editingId) {
      this.productService.add(payload).subscribe({
        next: () => {
          this.loading = false;
          this.showToast('Product added successfully.', 'success');
          this.startAdd();
          this.loadProducts();
        },
        error: (e: any) => {
          this.loading = false;
          this.showToast(e?.error?.message || 'Failed to add product.', 'danger');
        }
      });
      return;
    }

   
    this.productService.update(this.editingId, payload).subscribe({
      next: () => {
        this.loading = false;
        this.showToast('Product updated successfully.', 'success');
        this.startAdd();
        this.loadProducts();
      },
      error: (e: any) => {
        this.loading = false;
        this.showToast(e?.error?.message || 'Failed to update product.', 'danger');
      }
    });
  }

  
  delete(p: Product) {
    this.removeTarget = p;
    this.removing = false;
  }

  closeRemoveModal() {
    this.removeTarget = null;
  }

  
  confirmRemove() {
    if (!this.removeTarget) return;

    this.removing = true;

    this.productService.softDelete(this.removeTarget.productId).subscribe({
      next: () => {
        this.removing = false;
        this.showToast('Product removed successfully.', 'success');
        this.closeRemoveModal();
        this.loadProducts();
      },
      error: (e: any) => {
        this.removing = false;
        this.showToast(e?.error?.message || 'Failed to remove product.', 'danger');
      }
    });
  }
}
