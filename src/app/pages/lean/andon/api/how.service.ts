import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface How {
  id: string;
  step1: string;
  step1img: string;
  step2: string;
  step2L: string;
  step2B: string;
  step3: string;
  step3S: string;
  step3img1: string;
  step3L: string;
  step3img2: string;
  step3ID: string;
  step3img3: string;
  step4: string;
  step4M: string;
  step4img1: string;
  step4A: string;
  step4img2: string;
  step5: string;
  step5L: string;
  step5img1: string;
  step5B: string;
  step5img2: string;
  step6: string;
  step6O: string;
  step6img1: string;
  step6R: string;
  step6img2: string;
  step7: string;
  step7E: string;
  step7R: string;
  step7img1: string;
  step7img2: string;
  step8: string;
  step8F: string;
  step8M: string;
  step8S: string;
  step8T: string;
  step8img1: string;
  step8img2: string;
  step8img3: string;
  step9: string;
  step9A: string;
  step9T: string;
  step9P: string;
  step9C: string;
  step9img1: string;
  step9img2: string;
  step9img3: string;
  step9img4: string;
  step10: string;
  step10R: string;
  step10K: string;
  step10B: string;
  step10D: string;
  step10img1: string;
  step10img2: string;
  step10img3: string;
  step10img4: string;
}

@Injectable({
  providedIn: 'root'
})
export class HowService {
  private baseUrl = 'http://localhost:8888/api/how'; // Adjust with your backend URL

  constructor(private http: HttpClient) {}

  getAll(): Observable<How[]> {
    return this.http.get<How[]>(`${this.baseUrl}`)
      .pipe(
        catchError(error => {
          console.error('Error fetching data:', error);
          return throwError(error);
        })
      );
  }

  getById(id: string): Observable<How> {
    return this.http.get<How>(`${this.baseUrl}/${id}`);
  }

  create(data: How): Observable<How> {
    return this.http.post<How>(`${this.baseUrl}/`, data);
  }

  update(id: string, data: How): Observable<How> {
    return this.http.put<How>(`${this.baseUrl}/${id}`, data);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
