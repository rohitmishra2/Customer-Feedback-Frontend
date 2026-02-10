import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from '../config';

export type Product = {
  productId: number;
  name: string;
  description?: string;
  active?: number;
};

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Product[]>(`${API_BASE_URL}/product/all`);
  }

  add(payload: { name: string; description?: string }) {
    return this.http.post<Product>(`${API_BASE_URL}/product/add`, payload);
  }

  update(id: number, payload: { name: string; description?: string }) {
    return this.http.put<Product>(`${API_BASE_URL}/product/update/${id}`, payload);
  }

  softDelete(id: number) {
    return this.http.delete(`${API_BASE_URL}/product/delete/${id}`, { responseType: 'text' });
  }
}
