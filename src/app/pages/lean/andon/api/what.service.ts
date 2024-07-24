import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export interface What {
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
export class WhatService {
  private apiUrl = 'http://localhost:8888/api/what'; // Update with your actual backend API URL

  constructor(private http: HttpClient) { }

  getAllWhats(): Observable<What[]> {
    return this.http.get<What[]>(this.apiUrl);
  }

  getWhatById(id: string): Observable<What> {
    return this.http.get<What>(`${this.apiUrl}/${id}`);
  }

  createWhat(what: What): Observable<What> {
    return this.http.post<What>(this.apiUrl, what);
  }

  updateWhat(id: string, what: What): Observable<What> {
    return this.http.put<What>(`${this.apiUrl}/${id}`, what);
  }

  deleteWhat(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
