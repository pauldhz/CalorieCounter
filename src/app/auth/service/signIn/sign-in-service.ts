import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignInService {

  private http = inject(HttpClient);
  private readonly API_URL = 'api/auth';

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.API_URL}/signin`, { email, password })
      .pipe(tap((response: any) => {
        if (response.success) {
          localStorage.setItem('auth_token', response.token);
          localStorage.setItem('user_uid', response.uid);
        }
      }));
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

}
