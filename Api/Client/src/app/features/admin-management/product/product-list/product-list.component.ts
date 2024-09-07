import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../shared/services/product.service';
import { CommonModule, NgFor } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Product } from '../../../shared/models/product.model';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, NgFor, RouterLink],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{
  imageUrl: string = environment.imagesUrl;
  model: Product[] | null = null;

  constructor(private productService: ProductService, private router: Router) {
  }

  ngOnInit() {
    this.productService.getAllProducts().subscribe(products => {
      this.model = products;
      console.log(products);
    });
  }

  editProduct(id: string) {
    this.router.navigate(['/admin/products/edit', id]);
  }

  deleteProduct(id: string) {
    this.router.navigate(['/admin/products/delete', id]);
  }
}
