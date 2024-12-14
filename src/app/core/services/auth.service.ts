import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private LOGIN_URL = 'https://integrador2-backend-production.up.railway.app/api/v1/auth/login';
  private tokenKey = 'authToken';

  private REFRESH_URL = 'https://integrador2-backend-production.up.railway.app/api/v1/auth/refresh';
  private refreshTokenKey = 'refreshToken';

  private roleSubject = new BehaviorSubject<string | null>(null);
  role$ = this.roleSubject.asObservable();

  constructor(private httpClient: HttpClient, private router: Router) { }

  login(user: string, password: string): Observable<any>{
    return this.httpClient.post<any>(this.LOGIN_URL, {user, password}).pipe(
      tap(response => {
        if(response.token){
          console.log(response.token);
          this.setToken(response.token);
          this.setRefreshToken(response.refreshToken)
          this.updateRoleFromToken(response.token)
          this.autoRefreshToken();
        }
      })
    )
  }

  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  } 

  private getToken(): string | null {
    if(typeof window !== 'undefined'){
      return localStorage.getItem(this.tokenKey);
    }else {
      return null;
    }
  }

  private setRefreshToken(token: string): void {
    localStorage.setItem(this.refreshTokenKey, token);
  } 

  private getRefreshToken(): string | null {
    if(typeof window !== 'undefined'){
      return localStorage.getItem(this.refreshTokenKey);
    }else {
      return null;
    }
  }

  refreshToken(): Observable<any>{
    const refreshToken  = this.getRefreshToken()
    return this.httpClient.post<any>(this.REFRESH_URL, {refreshToken}).pipe(
      tap(response => {
        if(response.token){
          console.log(response.token);
          this.setToken(response.token);
          this.setRefreshToken(response.refreshToken)
          this.updateRoleFromToken(response.token); // Actualizar rol
          this.autoRefreshToken()
        }
      })
    )
  }

  autoRefreshToken(): void {
    const token = this.getToken();
    if(!token){
      return;
    }
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp * 1000;

    const timeout = exp - Date.now() - (60 * 1000);

    setTimeout(() => {
      this.refreshToken().subscribe()
    }, timeout);
   
  }


  isAuthenticated(): boolean {
    const token = this.getToken();
    if(!token){
      return false;
    }
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp * 1000;
    return Date.now() < exp;
  }

  logout(): void{
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    this.router.navigate(['/login']);
  }

  private updateRoleFromToken(token: string): void {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const role = payload.role;
    this.roleSubject.next(role); // Guardar el rol en el BehaviorSubject
  }
}
