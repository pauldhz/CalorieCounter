import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VerifyService {

  private http = inject(HttpClient);
  private readonly API_URL = 'api/auth';

  verifyToken(): Observable<any> {
    return this.http.get(`${this.API_URL}/verify`);
  }
}
