import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomenologinService {
  baseUrl = environment.baseUrl
  constructor(private http: HttpClient) { }

  getAllEvents() {
    return this.http.get(`${this.baseUrl}/events-nologin`);
  }
  getEventById(id: any) {
    return this.http.get(`${this.baseUrl}/events-nologin/${id}`);
  }

}
