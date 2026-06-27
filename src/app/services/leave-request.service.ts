import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaveRequestService {

  private baseUrl = 'https://employeeleave-api-pruthvi-hvh0h3apg2cwdpcq.centralindia-01.azurewebsites.net/api/LeaveRequests';

  constructor(private http: HttpClient) { }

  getLeaves(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }

  getLeaveById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  applyLeave(request: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, request);
  }

  approveLeave(id: number): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}/approve`, {});
  }

  rejectLeave(id: number): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}/reject`, {});
  }
}
