import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Image } from '../models/Image.model';
import { ImageInput } from '../models/image-input.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  selectedImage: BehaviorSubject<Image> = new BehaviorSubject<Image>({id: '', title: '', url: '', fileExtension: '', createdAt: ''});
  constructor(private http: HttpClient, private cookieService: CookieService) {
  }

  uploadImage(ImageInput: ImageInput): Observable<Image>
  {
    const formData = new FormData();
    formData.append('file', ImageInput.file);
    formData.append('title', ImageInput.title);
    return this.http.post<Image>(`${environment.apiUrl}/image`, formData, {
      headers: {
        'Authorization': this.cookieService.get('Authorization'),
    }});
  }

  getAllImages(): Observable<Image[]>
  {
    return this.http.get<Image[]>(`${environment.apiUrl}/image`);
  }

  selectImage(image: Image): void
  {
    this.selectedImage.next(image);
  }

  onSelectedImage(): Observable<Image>
  {
    return this.selectedImage.asObservable();
  }

}
