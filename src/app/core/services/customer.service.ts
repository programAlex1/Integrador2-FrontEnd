import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule,HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private apiUrl = 'https://integrador2-backend-production.up.railway.app/api/v1/customer';

  constructor(private _http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const authToken = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    });
  }

  updateCustomer(id: number, data: any): Observable<any> {
    return this._http.put(`${this.apiUrl}/${id}`, data, {
      headers: this.getAuthHeaders()
    });
  }

  addCustomer(data: any): Observable<any> {
    return this._http.post(this.apiUrl, data, {
      headers: this.getAuthHeaders()
    });
  }

  getCustomerList(): Observable<any> {
    return this._http.get(this.apiUrl, {
      headers: this.getAuthHeaders()
    });
  }

  deleteCustomer(id: number): Observable<any> {
    return this._http.delete(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }
}
