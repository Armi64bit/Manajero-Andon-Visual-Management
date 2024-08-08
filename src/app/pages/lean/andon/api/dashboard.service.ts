import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dashboard, Station } from './dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = 'http://localhost:8888/api/dashboards';

  constructor(private http: HttpClient) { }

  getAllDashboards(): Observable<Dashboard[]> {
    return this.http.get<Dashboard[]>(this.apiUrl);
  }

  getDashboardById(id: string): Observable<Dashboard> {
    return this.http.get<Dashboard>(`${this.apiUrl}/${id}`);
  }

  createDashboard(dashboard: Dashboard): Observable<Dashboard> {
    return this.http.post<Dashboard>(this.apiUrl, dashboard);
  }

  deleteDashboard(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  getDashboardData(dashboardId: string): Observable<Station[]> {
    return this.http.get<Station[]>(`${this.apiUrl}/dashboards/${dashboardId}/stations`);
  }
  updateDashboard(id: string, dashboard: Dashboard): Observable<Dashboard> {
    return this.http.put<Dashboard>(`${this.apiUrl}/${id}`, dashboard);
  }
}
