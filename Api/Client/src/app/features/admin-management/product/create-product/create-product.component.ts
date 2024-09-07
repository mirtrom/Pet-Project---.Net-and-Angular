import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../shared/services/product.service';
import { Router } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';
import { CategoryService } from '../../../shared/services/category.service';
import { Category } from '../../../shared/models/Category.model';
import { ProductInput } from '../../../shared/models/product-input.model';
import { ImageSelectorComponent } from "../image-selector/image-selector.component";
import { Product } from '../../../shared/models/product.model';
import { environment } from '../../../../../environments/environment';
import { ImageService } from '../../../shared/services/image.service';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [FormsModule, CommonModule, NgFor, ImageSelectorComponent],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css'
})
export class CreateProductComponent {
  isImageSelectorVisible: boolean = false;
  imageUrl: string = environment.imagesUrl;
  categories: Category[] = [];
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
      url: '',
      fileExtension: '',
      createdAt: ''
    }
  };
  constructor(private productService: ProductService, private router: Router, private categoryService: CategoryService, private imageService: ImageService) { }
  ngOnInit() {
    this.categoryService.getAllCategories().subscribe(data => {
      this.categories = data;
    });
    this.imageService.onSelectedImage().subscribe({
      next: (image) => {
        console.log("Selected image:", image);
        if (this.model) {
          this.isImageSelectorVisible = false;
          this.model.image = image; // Assign the selected image
        }
      }
    });
  }

  OnCancel() {
    console.log("Cancelled");
    this.router.navigate(['/admin/products']);
  }

  OnSubmit() {
    console.log(this.model);
    let request: ProductInput = {
      id: this.model.id,
      imageId: this.model.image.id,
      categoryId: this.model.category.id,
      description: this.model.description,
      name: this.model.name,
      price: this.model.price,
    };
    this.productService.createProduct(request).subscribe
      (data => {
        this.router.navigate(['/admin/products']);
        console.log(data);
      });
  }
  showImageSelector() {
    this.isImageSelectorVisible = true;
  }

  hideImageSelector() {
    this.isImageSelectorVisible = false;
    console.log(this.model)
  }
}
