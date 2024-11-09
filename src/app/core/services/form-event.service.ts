import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule,HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormEventService {

  private apiUrl = 'http://localhost:8080/api/v1/event';

  constructor(private _http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const authToken = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    });
  }

  updateEvent(id: number, data: any): Observable<any> {
    return this._http.put(`${this.apiUrl}/${id}`, data, {
      headers: this.getAuthHeaders()
    });
  }

  addEvent(data: any): Observable<any> {
    return this._http.post(this.apiUrl, data, {
      headers: this.getAuthHeaders()
    });
  }

  getEventList(): Observable<any> {
    return this._http.get(this.apiUrl, {
      headers: this.getAuthHeaders()
    });
  }

  deleteEvent(id: number): Observable<any> {
    return this._http.delete(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }
}
