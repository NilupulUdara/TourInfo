import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ImageUploadRequestDto, ImageDto } from '../models/models.module';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private apiUrl = environment.apiUrl + '/api/Images';

  constructor(private http: HttpClient) { }

  upload(image: ImageUploadRequestDto): Observable<ImageDto> {
    const formData = new FormData();
    formData.append('file', image.file);
    formData.append('fileName', image.fileName);
    if (image.fileDescription) formData.append('fileDescription', image.fileDescription);

    return this.http.post<ImageDto>(`${this.apiUrl}/Upload`, formData);
  }
}