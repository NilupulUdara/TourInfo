import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { RegisterRequestDto, LoginRequestDto, LoginResponseDto } from '../models/models.module';
import { environment } from '../environment/environment';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl + '/api/Auth';

  private loggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  public isLoggedIn$ = this.loggedInSubject.asObservable();

  constructor(private http: HttpClient) { }

  register(registerRequest: RegisterRequestDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/Register`, registerRequest);
  }

  login(loginRequest: LoginRequestDto): Observable<LoginResponseDto> {
    return new Observable(observer => {
      this.http.post<LoginResponseDto>(`${this.apiUrl}/login`, loginRequest)
        .subscribe({
          next: (response) => {
            localStorage.setItem('jwtToken', response.jwtToken);
            this.loggedInSubject.next(true);
            observer.next(response);
            observer.complete();
          },
          error: (err) => observer.error(err)
        });
    });
  }

  logout(): void {
    localStorage.removeItem('jwtToken');
    this.loggedInSubject.next(false);
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('jwtToken');
  }

  // ✅ Decode roles from JWT
  getUserRoles(): string[] {
    const token = localStorage.getItem('jwtToken');
    if (!token) return [];

    try {
      const decoded: any = jwtDecode(token);
      const roles = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      return typeof roles === 'string' ? [roles] : roles || [];
    } catch {
      return [];
    }
  }

  hasRole(role: string): boolean {
    return this.getUserRoles().some(r => r.toLowerCase() === role.toLowerCase());
  }
}
