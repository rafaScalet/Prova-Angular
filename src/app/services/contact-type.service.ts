import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContactType } from '../interfaces/contact-types';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactTypeService {
  url = 'http://localhost:3000/contact-types';

  constructor(private http: HttpClient) { }

  getContactTypes(): Observable<ContactType[]>{
    return this.http.get<ContactType[]>(this.url);
  }

  postContactType(contactType: ContactType): Observable<ContactType>{
    return this.http.post<ContactType>(this.url, contactType);
  }
}
