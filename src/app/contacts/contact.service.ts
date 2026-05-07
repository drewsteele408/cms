import { EventEmitter, Injectable } from '@angular/core';
import { Contact as ContactModel } from '../contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contactSelectedEvent = new EventEmitter<ContactModel>();
  contacts: ContactModel[] = [];
  constructor() {
    this.contacts = MOCKCONTACTS;
  }

  getContacts(): ContactModel[] {
    return this.contacts.slice();
  }

  getContact(id: string): ContactModel | null {
    for (const contact of this.contacts) {
      if (contact.id === id) {
        return contact;
      }
    }
    return null;
  }
}
