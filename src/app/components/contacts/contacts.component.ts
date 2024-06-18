import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Contact } from '../../interfaces/contact';
import { ContactType } from '../../interfaces/contact-types';
import { ContactService } from '../../services/contact.service';
import { ContactTypeService } from '../../services/contact-type.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css',
})
export class ContactsComponent implements OnInit {
  contacts: Contact[] = [];
  contactTypes: ContactType[] = [];
  contactFormGroup: FormGroup;

  constructor(
    private contactTypeService: ContactTypeService,
    private contactService: ContactService,
    private formBuilder: FormBuilder
  ) {
    this.contactFormGroup = formBuilder.group({
      id: [''],
      name: [''],
      email: [''],
      phone: [''],
      favorite: [false],
      contactTypeId: [''],
    });
  }

  ngOnInit() {
    this.loadTypes();
    this.loadContact();
  }

  save() {
    this.contactService.postContact(this.contactFormGroup.value).subscribe({
      next: (data) => {
        this.contacts.push(data);
        this.contactFormGroup.reset();
        this.contactFormGroup.patchValue({ favorite: false });
      },
    });
  }


  delete(contact: Contact) {
    this.contactService.deleteContact(contact).subscribe({
      next: () => this.loadContact(),
    });
  }

  loadContact(){
    this.contactService.getContacts().subscribe({
      next: (data) => {
        this.contacts = data;
      },
    });
  }

  loadTypes() {
    this.contactTypeService.getContactTypes().subscribe({
      next: (data) => {
        this.contactTypes = data;
      },
    });
  }

  getTypeName(contactTypeId: number): ContactType | undefined{
    return this.contactTypes.find((contactType) => contactType.id === contactTypeId);
  }
}
