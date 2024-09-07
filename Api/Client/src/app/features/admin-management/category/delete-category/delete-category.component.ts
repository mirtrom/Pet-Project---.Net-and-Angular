import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CategoryService } from '../../../shared/services/category.service';
import { Category } from '../../../shared/models/Category.model';

@Component({
  selector: 'app-delete-category',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './delete-category.component.html',
  styleUrl: './delete-category.component.css'
})
export class DeleteCategoryComponent implements OnInit {
  model: Category = {
    id: '',
    name: ''
  };

  constructor(private categoryService: CategoryService, private router: Router, private route: ActivatedRoute) { }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.categoryService.getCategoryById(id).subscribe(category => {
        this.model = category;
    });
  };
}

onDelete() {
  if (this.model.id) {
    this.categoryService.deleteCategory(this.model.id).subscribe(() => {
      this.router.navigate(['/admin/categories']);
    });
  }
}

onCancel(){
  this.router.navigate(['/admin/categories']);
}

}
