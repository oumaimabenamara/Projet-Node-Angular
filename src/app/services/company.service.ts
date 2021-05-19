import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  baseUrl = environment.baseUrl
  constructor(private http: HttpClient) { }

  addCompany(companyData: any)
  {
    return this.http.post(`${this.baseUrl}/companies`, companyData);
  }

  getAllCompanies()
  {
    return this.http.get(`${this.baseUrl}/companies`);
  }

  getCompanyById(id: any)
  {
    return this.http.get(`${this.baseUrl}/companies/${id}`);
  }

  deleteCompanyById(id: any)
  {
    return this.http.delete(`${this.baseUrl}/companies/${id}`);
  }

  editCompanyById(id: any, companyDataEdited: any)
  {
    return this.http.put(`${this.baseUrl}/companies/${id}`, companyDataEdited)
  }
  
}
