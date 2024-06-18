import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ContactType } from '../../interfaces/contact-types';
import { ContactTypeService } from '../../services/contact-type.service';

@Component({
  selector: 'app-contact-types',
  templateUrl: './contact-types.component.html',
  styleUrl: './contact-types.component.css',
})
export class ContactTypesComponent {
  contactTypes: ContactType[] = [];
  contactTypeFormGrup: FormGroup;

  constructor(
    private contactTypeService: ContactTypeService,
    private formBuilder: FormBuilder
  ) {
    this.contactTypeFormGrup = formBuilder.group({
      id: [''],
      type: ['']
    });
  }

  save(){
    this.contactTypeService.postContactType(this.contactTypeFormGrup.value).subscribe({
      next: (data) => {
        this.contactTypes.push(data);
        this.contactTypeFormGrup.reset();
      }
    })
  }
}
