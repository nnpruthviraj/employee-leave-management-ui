import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'https://employeeleave-api-pruthvi-hvh0h3apg2cwdpcq.centralindia-01.azurewebsites.net/api/Auth';

  constructor(private http: HttpClient) { }

  login(userName: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, {
      userName: userName,
      password: password
    });
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  saveRole(role: string): void {
    localStorage.setItem('role', role);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  isAdmin(): boolean {
    return this.getRole() === 'Admin';
  }

  isEmployee(): boolean {
    return this.getRole() === 'Employee';
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }
}
