import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Contact } from '../../contact.model';
import { ContactItem } from '../contact-item/contact-item';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-edit',
  imports: [CommonModule, FormsModule, ContactItem],
  templateUrl: './contact-edit.html',
  styleUrl: './contact-edit.css',
})
export class ContactEdit implements OnInit {
  originalContact: Contact | null = null;
  contact: Contact = new Contact('', '', '', '', '', null);
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  id: string = '';

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      if (this.id === undefined || this.id === null) {
        this.editMode = false;
        return;
      }

      this.originalContact = this.contactService.getContact(this.id);
      if (this.originalContact === undefined || this.originalContact === null) {
        return;
      }

      this.editMode = true;
      this.contact = JSON.parse(JSON.stringify(this.originalContact));

      if (this.contact.group) {
        this.groupContacts = JSON.parse(JSON.stringify(this.contact.group));
      }
    });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newContact = new Contact(
      '',
      value.name,
      value.email,
      value.phone,
      value.imageUrl,
      this.groupContacts.length > 0 ? this.groupContacts : null
    );

    if (this.editMode && this.originalContact) {
      this.contactService.updateContact(this.originalContact, newContact);
    } else {
      this.contactService.addContact(newContact);
    }

    this.router.navigateByUrl('/contacts');
  }

  onCancel() {
    this.router.navigateByUrl('/contacts');
  }

  onRemoveItem(index: number) {
    if (index < 0 || index >= this.groupContacts.length) {
      return;
    }

    this.groupContacts.splice(index, 1);
  }
}
