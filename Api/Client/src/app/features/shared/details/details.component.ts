import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';
import { environment } from '../../../../environments/environment';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  imageUrl: string = environment.imagesUrl;

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

}
