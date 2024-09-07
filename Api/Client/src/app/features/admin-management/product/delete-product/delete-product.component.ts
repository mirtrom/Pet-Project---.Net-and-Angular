import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../shared/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Product } from '../../../shared/models/product.model';

@Component({
  selector: 'app-delete-product',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css']
})
export class DeleteProductComponent implements OnInit {
  model: Product = {
    id: '',
    name: '',
    price: 0,
    description: '',
    category: {
      id: '',
      name: ''
    },
    image: {
      id: '',
      title: '',
      createdAt: '',
      url: '',
      fileExtension: '',
    }
  };

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getProductById(id).subscribe(data => {
        this.model = data;
        console.log("Fetched product data:", data);
      });
    }
  }

  onDelete() {
    if (this.model.id) {
      this.productService.deleteProduct(this.model.id).subscribe(() => {
        this.router.navigate(['/admin/products']);
      });
    }
  }

  onCancel() {
    this.router.navigate(['/admin/products']);
  }
}
