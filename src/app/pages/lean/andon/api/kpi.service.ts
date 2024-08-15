import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KpiService {

  private baseUrl = 'http://localhost:8888/api/kpis';

  constructor(private http: HttpClient) { }

  getKpisForAllDashboards(): Observable<any> {
    return this.http.get(`${this.baseUrl}/all-dashboards`);
  }
  getNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.baseUrl}/notifications`);
  }
}
