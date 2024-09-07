import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';
import { CommonModule, NgFor } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  imageUrl: string = environment.imagesUrl;
  model: Product[] | null = null;
  constructor(private productService: ProductService, private router: Router) {}
  ngOnInit() {
    this.productService.getAllProducts().subscribe(data => {
      this.model = data;
    });
  }

  showDetails(id: string) {
    console.log("Navigating to product details page with id:", id);
    this.router.navigate(['/products', id]);
  }


}
