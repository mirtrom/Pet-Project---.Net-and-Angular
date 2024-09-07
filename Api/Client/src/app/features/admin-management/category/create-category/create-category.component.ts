import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../../../shared/services/category.service';
import { FormsModule } from '@angular/forms';
import { CategoryInput } from '../../../shared/models/category-input.model';

@Component({
  selector: 'app-create-category',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-category.component.html',
  styleUrl: './create-category.component.css'
})
export class CreateCategoryComponent {
  form: any;
  category: CategoryInput = {
    name: '',
  };
  constructor(private router: Router, private categoryService: CategoryService ) { }
  onSubmit(){
    this.categoryService.createCategory(this.category).subscribe
    (data => {
      this.router.navigate(['/admin/categories']);
    });
  }

  onCancel(){
    this.router.navigate(['/admin/categories']);
  }
}
