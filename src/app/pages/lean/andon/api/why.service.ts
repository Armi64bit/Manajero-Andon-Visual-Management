import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Why {
  id?: string;
  title: string;
  subpoint1: string;
  content1: string;
  image1?: string;
  subpoint2: string;
  content2: string;
  image2?: string;
  subpoint3: string;
  content3: string;
  image3?: string;
  subpoint4: string;
  content4: string;
  image4?: string;
}

@Injectable({
  providedIn: 'root'
})
export class WhyService {
  private apiUrl = 'http://localhost:8888/api/why';

  constructor(private http: HttpClient) {}

  getAllWhys(): Observable<Why[]> {
    return this.http.get<Why[]>(this.apiUrl);
  }

  getWhyById(id: string): Observable<Why> {
    return this.http.get<Why>(`${this.apiUrl}/${id}`);
  }

  createWhy(why: Why): Observable<Why> {
    return this.http.post<Why>(this.apiUrl, why);
  }

  updateWhy(id: string, why: Why): Observable<Why> {
    return this.http.put<Why>(`${this.apiUrl}/${id}`, why);
  }

  deleteWhy(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
