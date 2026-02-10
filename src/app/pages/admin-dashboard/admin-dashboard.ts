import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FeedbackService } from '../../services/feedback';

type FeedbackRow = {
  userName: string;
  userEmail: string;
  productName: string;
  rating: number;
  comment: string;
  createdAt?: string;
};

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css']
})
export class AdminDashboard {

  selectedRating: any = 'ALL';
  allFeedbacks: FeedbackRow[] = [];
  filteredFeedbacks: FeedbackRow[] = [];

  constructor(
    private feedbackService: FeedbackService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadAllFeedback();
  }

  loadAllFeedback() {
    this.feedbackService.getAllFeedback().subscribe({
      next: (res: any[]) => {
        this.allFeedbacks = (res || []).map(f => ({
          userName: f.user?.fullName ?? '',
          userEmail: f.user?.email ?? '',
          productName: f.product?.name ?? '',
          rating: Number(f.rating),
          comment: f.comments ?? '',
          createdAt: f.createdAt ?? ''
          
        }));

      
        this.filteredFeedbacks = [...this.allFeedbacks];

      
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Failed to load feedback', err);
      }
    });
  }

  applyFilter() {
    const val = this.selectedRating;

    if (val === 'ALL') {
      this.filteredFeedbacks = [...this.allFeedbacks];
      return;
    }

    const ratingNum = Number(val);
    this.filteredFeedbacks = this.allFeedbacks.filter(f => f.rating === ratingNum);
  }
}
