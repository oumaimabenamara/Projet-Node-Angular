import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginRegisterService {

  constructor(private http: HttpClient) { }
  addUser(userData: any)
  {
    return this.http.post('http://localhost:3000/users', userData);
  }

  getAllUsers()
  {
    return this.http.get('http://localhost:3000/users');
  }

  getUserById(id: any)
  {
    return this.http.get('http://localhost:3000/users/'+id);
  }
  
}
