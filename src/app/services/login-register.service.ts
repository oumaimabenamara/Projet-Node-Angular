import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginRegisterService {

  constructor(private http: HttpClient) { }

  registerCompany(companyData: any) {
    return this.http.post('http://localhost:3000/register', companyData);
  }

  loginCompany(companyData: any) {
    return this.http.post('http://localhost:3000/login', companyData);
  }

  forgotPassword(companyData: any) {
    return this.http.post('http://localhost:3000/forgot-password', companyData);
  }
  resetPassword(companyData: any) {
    return this.http.post('http://localhost:3000/reset-password', companyData);
  }

}
