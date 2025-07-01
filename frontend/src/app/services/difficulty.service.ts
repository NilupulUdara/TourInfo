import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';
import { DifficultyDto } from '../models/models.module';
@Injectable({
  providedIn: 'root'
})
export class DifficultyService {
  private apiUrl = environment.apiUrl + '/api/Difficulties';

  constructor(private http: HttpClient) {}

  getAll(): Observable<DifficultyDto[]> {
    return this.http.get<DifficultyDto[]>(this.apiUrl);
  }
}
