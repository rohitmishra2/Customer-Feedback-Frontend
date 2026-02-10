import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from '../config';

@Injectable({ providedIn: 'root' })
export class FeedbackService {

  private BASE = `${API_BASE_URL}/feedback`;

  constructor(private http: HttpClient) {}

  addFeedback(data: any) {
    return this.http.post(`${this.BASE}/add`, data);
  }

  getAllFeedback() {
    return this.http.get<any[]>(`${this.BASE}/all`);
  }

  getByRating(rating: number) {
    return this.http.get<any[]>(`${this.BASE}/rating/${rating}`);
  }
}
