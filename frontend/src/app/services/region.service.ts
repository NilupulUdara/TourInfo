import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegionDto } from '../models/models.module';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class RegionService {
  private apiUrl = environment.apiUrl + '/api/Regions';

  constructor(private http: HttpClient) { }

  getAll(): Observable<RegionDto[]> {
    return this.http.get<RegionDto[]>(this.apiUrl);
  }

  getById(id: string): Observable<RegionDto> {
    return this.http.get<RegionDto>(`${this.apiUrl}/${id}`);
  }

  create(region: RegionDto): Observable<RegionDto> {
    return this.http.post<RegionDto>(this.apiUrl, region);
  }

  update(id: string, region: RegionDto): Observable<RegionDto> {
    return this.http.put<RegionDto>(`${this.apiUrl}/${id}`, region);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}