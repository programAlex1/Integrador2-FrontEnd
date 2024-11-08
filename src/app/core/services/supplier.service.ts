import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  private apiUrl = 'http://localhost:8080/api/v1/supplier';

  constructor(private _http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const authToken = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    });
  }

  updateSupplier(id: number, data: any): Observable<any> {
    return this._http.put(`${this.apiUrl}/${id}`, data, {
      headers: this.getAuthHeaders()
    });
  }

  addSupplier(data: any): Observable<any> {
    return this._http.post(this.apiUrl, data, {
      headers: this.getAuthHeaders()
    });
  }

  getSupplierList(): Observable<any> {
    return this._http.get(this.apiUrl, {
      headers: this.getAuthHeaders()
    });
  }

  deleteSupplier(id: number): Observable<any> {
    return this._http.delete(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }
}
