import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../shared/services/product.service';
import { CategoryService } from '../../../shared/services/category.service';
import { ImageSelectorComponent } from "../image-selector/image-selector.component";
import { ProductInput } from '../../../shared/models/product-input.model';
import { Category } from '../../../shared/models/Category.model';
import { ImageService } from '../../../shared/services/image.service';
import { Product } from '../../../shared/models/product.model';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [FormsModule, CommonModule, NgFor, ImageSelectorComponent],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent {
  imageUrl: string = environment.imagesUrl;
  form: any;
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
  categories: Category[] = [];
  isImageSelectorVisible: boolean = false;
  constructor(private router : Router, private route: ActivatedRoute, private productService: ProductService, private categoryService: CategoryService, private imageService: ImageService) { }
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getProductById(id).subscribe(data => {
        this.model = {
          id: data.id,
          name: data.name,
          price: data.price,
          description: data.description,
          category: data.category,
          image: data.image || { id: '', title: '', url: '', fileExtension: '', createdAt: '' } // Ensure image is not undefined
        };
        this.categoryService.getAllCategories().subscribe(categoriesData => {
          this.categories = categoriesData;
          console.log("Fetched categories data:", this.categories);
        });
        console.log("Fetched product data:", data);
      });
    } else {
      this.categoryService.getAllCategories().subscribe(data => {
        this.categories = data;
        console.log("Fetched categories data:", data);
      });
    }

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

  onSubmit() {
    let request: ProductInput = {
      id: this.model.id,
      imageId: this.model.image.id,
      categoryId: this.model.category.id,
      description: this.model.description,
      name: this.model.name,
      price: this.model.price,
    };
    this.productService.updateProduct(request).subscribe(data => {
      console.log("Updated product data:", data);

      this.router.navigate(['/admin/products']);
    });
  }

  onCancel() {
    this.router.navigate(['/admin/products']);
  }

  showImageSelector() {
    this.isImageSelectorVisible = true;
  }

  hideImageSelector() {
    this.isImageSelectorVisible = false;
    console.log(this.model)
  }
}
