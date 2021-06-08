import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  baseUrl = environment.baseUrl
  constructor(private http: HttpClient) { }

  showStat() {
    return this.http.get(`${this.baseUrl}/dashboard`);
  }

}
