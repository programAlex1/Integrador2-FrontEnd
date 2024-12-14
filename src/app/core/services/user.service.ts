import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http:HttpClient) { }
  

  updateUser(id:number,data:any): Observable<any>{
    return this._http.put(`https://integrador2-backend-production.up.railway.app/api/v1/auth/update/${id}`,data)
  }

  addUser(data:any): Observable<any>{
    return this._http.post('https://integrador2-backend-production.up.railway.app/api/v1/auth/save',data)
  }
  getUserList(): Observable<any>{
    return this._http.get('https://integrador2-backend-production.up.railway.app/api/v1/auth/list')

  }

  deleteUser(id:number): Observable<any>{
    return this._http.delete(`https://integrador2-backend-production.up.railway.app/api/v1/auth/delete/${id}`);
  }
}
