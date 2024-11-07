import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http:HttpClient) { }
  

  updateUser(id:number,data:any): Observable<any>{
    return this._http.put(`http://localhost:8080/api/v1/auth/update/${id}`,data)
  }

  addUser(data:any): Observable<any>{
    return this._http.post('http://localhost:8080/api/v1/auth/save',data)
  }
  getUserList(): Observable<any>{
    return this._http.get('http://localhost:8080/api/v1/auth/list')

  }

  deleteUser(id:number): Observable<any>{
    return this._http.delete(`http://localhost:8080/api/v1/auth/delete/${id}`);
  }
}
