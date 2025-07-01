import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WalkDto } from '../models/models.module';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class WalkService {
  private apiUrl = environment.apiUrl + '/api/Walks';

  constructor(private http: HttpClient) { }

  getAll(filterOn?: string, filterQuery?: string, sortBy?: string, isAscending?: boolean, pageNumber: number = 1, pageSize: number = 1000): Observable<WalkDto[]> {
    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());
    
    if (filterOn) params = params.set('filterOn', filterOn);
    if (filterQuery) params = params.set('filterQuery', filterQuery);
    if (sortBy) params = params.set('sortBy', sortBy);
    if (isAscending !== undefined) params = params.set('isAscending', isAscending.toString());

    return this.http.get<WalkDto[]>(this.apiUrl, { params });
  }

  getById(id: string): Observable<WalkDto> {
    return this.http.get<WalkDto>(`${this.apiUrl}/${id}`);
  }

  create(walk: WalkDto): Observable<WalkDto> {
    return this.http.post<WalkDto>(this.apiUrl, walk);
  }

  update(id: string, walk: WalkDto): Observable<WalkDto> {
    return this.http.put<WalkDto>(`${this.apiUrl}/${id}`, walk);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}