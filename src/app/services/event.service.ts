import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  baseUrl = environment.baseUrl
  constructor(private http: HttpClient) { }

  addEvent(eventData: any)
  {
    return this.http.post(`${this.baseUrl}/events`, eventData);
  }

  getAllEvents()
  {
    return this.http.get(`${this.baseUrl}/events`);
  }

  getEventById(id: any)
  {
    return this.http.get(`${this.baseUrl}/events`+id);
  }

  deleteEventById(id: any)
  {
    return this.http.delete(`${this.baseUrl}/events`+id);
  }

  editEventById(id: any, eventDataEdited: any)
  {
    return this.http.put(`${this.baseUrl}/events`+id, eventDataEdited)
  }
  
}
