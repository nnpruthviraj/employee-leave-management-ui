import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = 'https://employeeleave-api-pruthvi-hvh0h3apg2cwdpcq.centralindia-01.azurewebsites.net/api/Employees';

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }

  getEmployeeById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  createEmployee(employee: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, employee);
  }

  updateEmployee(id: number, employee: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, employee);
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
