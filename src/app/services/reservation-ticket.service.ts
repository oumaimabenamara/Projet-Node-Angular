import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservationTicketService {
  baseUrl = environment.baseUrl
  constructor(private http: HttpClient) { }

  sendReservationTicket(eventID: any, userInfo: any) {
    return this.http.post(`${this.baseUrl}/reservation/${eventID}`, userInfo);
  }
}
