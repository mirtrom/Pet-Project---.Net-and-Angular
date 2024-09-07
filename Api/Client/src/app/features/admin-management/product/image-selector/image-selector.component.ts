import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ImageService } from '../../../shared/services/image.service';
import { ImageInput } from '../../../shared/models/image-input.model';
import { Image } from '../../../shared/models/Image.model';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-image-selector',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './image-selector.component.html',
  styleUrls: ['./image-selector.component.css'] // Fixed typo: styleUrl -> styleUrls
})
export class ImageSelectorComponent implements OnInit {
  private file?: File;
  title: string = '';
  imageList: Image[] = [];
  imageUrl: string = environment.imagesUrl;

  @ViewChild('form', { static: false }) formInput?: NgForm;
  @ViewChild('fileInput', { static: false }) fileInput?: ElementRef; // Added ViewChild for file input

  constructor(private imageService: ImageService) {}

  ngOnInit(): void {
    this.imageService.getAllImages().subscribe({
      next: (images) => {
        this.imageList = images;
      }
    });
  }

  onFileUploadChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      this.file = target.files[0];
    }
  }

  selectImage(image: Image): void {
    console.log('Selected image:', image);
    this.imageService.selectImage(image);

  }
  uploadImage(): void {
    if (this.file && this.title !== '') {
      const imageInput: ImageInput = {
        file: this.file,
        title: this.title
      };
      console.log(imageInput);
      this.imageService.uploadImage(imageInput).subscribe({
        next: (response) => {
          this.formInput?.resetForm(); // Reset form fields
          this.fileInput!.nativeElement.value = ''; // Reset file input manually
          this.file = undefined; // Clear the file in the component state
          this.imageList.push(response); // Add the new image to the list
          console.log(response);
        }
      });
    } else {
      console.log('No image selected for upload');
    }
  }
}
