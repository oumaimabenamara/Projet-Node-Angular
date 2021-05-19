import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  baseUrl = environment.baseUrl
  constructor(private http: HttpClient) { }

  addTag(tagData: any) {
    return this.http.post(`${this.baseUrl}/tags`, tagData);
  }

  getAllTags() {
    return this.http.get(`${this.baseUrl}/tags`);
  }

  getTagById(id: any) {
    return this.http.get(`${this.baseUrl}/tags/${id}`);
  }

  deleteTagById(id: any) {
    return this.http.delete(`${this.baseUrl}/tags/${id}`);
  }
  editTagById(id: number, tagDataEdited: any) {
    return this.http.put(`${this.baseUrl}/tags/${id}`, tagDataEdited)
  }
}
