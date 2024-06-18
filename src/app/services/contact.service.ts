import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from './../interfaces/contact';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ContactService {
  url = 'http://localhost:3000/contact';

  constructor(private http: HttpClient) { }

  postContact(contact: Contact): Observable<Contact>{
    return this.http.post<Contact>(this.url, contact);
  }
}
