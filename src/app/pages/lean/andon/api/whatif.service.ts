import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
export interface Whatif {
  id?: string; // Optional for new entities that are not yet persisted
  title: string;
  subpoint1: string;
  content1: string;
  image1?: string; // Optional
  image2?: string; // Optional
}

@Injectable({
  providedIn: 'root'
})
export class WhatifService {
  private apiUrl = 'http://localhost:8888/api/whatif';

  constructor(private http: HttpClient) { }

  getAllWhatifs(): Observable<Whatif[]> {
    return this.http.get<Whatif[]>(this.apiUrl);
  }

  getWhatifById(id: string): Observable<Whatif> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Whatif>(url);
  }

  createWhatif(whatif: Whatif): Observable<Whatif> {
    return this.http.post<Whatif>(this.apiUrl, whatif);
  }

  updateWhatif(id: string, whatif: Whatif): Observable<Whatif> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Whatif>(url, whatif);
  }

  deleteWhatif(id: string): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
