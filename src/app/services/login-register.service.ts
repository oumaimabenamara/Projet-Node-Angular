import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginRegisterService {
  baseUrl = environment.baseUrl
  constructor(private http: HttpClient) { }

  registerCompany(companyData: any) {
    return this.http.post(`${this.baseUrl}/register`, companyData);
  }

  loginCompany(companyData: any) {
    return this.http.post(`${this.baseUrl}/login`, companyData);
  }

  forgotPassword(companyData: any) {
    return this.http.get(`${this.baseUrl}/forget-password/${companyData}`);
  }
  resetPassword(companyData: any) {
    return this.http.post(`${this.baseUrl}/reset-password`, companyData);
  }

}
