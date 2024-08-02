import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Station } from './dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class StationService {
  private apiUrl = `http://localhost:8888/api/stations`; // Define the base URL

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  // Get all stations
  getAllStations(): Observable<Station[]> {
    return this.http.get<Station[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Get station by ID
  getStationById(id: string): Observable<Station> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Station>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Create a new station
  createStation(station: Station): Observable<Station> {
    return this.http.post<Station>(this.apiUrl, station, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Update an existing station
  updateStation(id: string, station: Station): Observable<Station> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Station>(url, station, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Delete a station by ID
  deleteStation(id: string): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Handle HTTP errors
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(error);
  }
}
