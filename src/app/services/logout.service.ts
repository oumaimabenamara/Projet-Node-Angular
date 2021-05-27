import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  baseUrl = environment.baseUrl
  constructor(private http: HttpClient) { }
  
  Logout() {
    return this.http.get(`${this.baseUrl}/logout`);
  }

}
