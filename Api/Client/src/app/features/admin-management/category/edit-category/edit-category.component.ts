import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../../shared/services/category.service';
import { Category } from '../../../shared/models/Category.model';

@Component({
  selector: 'app-edit-category',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css'
})
export class EditCategoryComponent {
  model: Category = {
    id: '',
    name: ''
  };

  constructor(private router: Router, private categoryService: CategoryService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.categoryService.getCategoryById(id).subscribe(category => {
        this.model = category;
      });
    }
  }

  onSubmit() {
    if (this.model.id) {
      this.categoryService.updateCategory(this.model).subscribe(() => {
        this.router.navigate(['/admin/categories']);
      });
    }
  }

  onCancel() {
    this.router.navigate(['/admin/categories']);
  }
}
