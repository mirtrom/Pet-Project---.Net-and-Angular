import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../shared/services/category.service';
import { CommonModule, NgFor } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Category } from '../../../shared/models/Category.model';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule, NgFor, RouterModule],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent implements OnInit {
  constructor(private categoryService: CategoryService, private router: Router) { }

  categories: Category[] = [];

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  deleteCategory(id: string): void {
    this.router.navigate([`admin/categories/delete/${id}`]);
  }

  editCategory(id: string): void {
    this.router.navigate([`admin/categories/edit/${id}`]);
  }
}
