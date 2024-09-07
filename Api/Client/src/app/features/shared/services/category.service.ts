import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/Category.model';
import { environment } from '../../../../environments/environment';
import { CategoryInput } from '../models/category-input.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.apiUrl}/category`);
  }

  createCategory(category: CategoryInput): Observable<Category> {
    return this.http.post<Category>(`${environment.apiUrl}/category`, category, {
      headers: {
        'Authorization': this.cookieService.get('Authorization'),
    }});
  }

  deleteCategory(id: string): Observable<Category> {
    return this.http.delete<Category>(`${environment.apiUrl}/category/${id}`, {
      headers: {
        'Authorization': this.cookieService.get('Authorization'),
    }});
  }

  getCategoryById(id: string): Observable<Category> {
    return this.http.get<Category>(`${environment.apiUrl}/category/${id}`);
  }

  updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(`${environment.apiUrl}/category/${category.id}`, category, {
      headers: {
        'Authorization': this.cookieService.get('Authorization'),
    }});
  }
}
