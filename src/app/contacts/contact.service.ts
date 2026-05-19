import { EventEmitter, Injectable } from '@angular/core';
import { Contact as ContactModel } from '../contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contactSelectedEvent = new EventEmitter<ContactModel>();
  contactChangedEvent = new EventEmitter<ContactModel[]>();
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

  deleteContact(contact: ContactModel | null) {
    if (!contact) {
      return;
    }

    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }

    this.contacts.splice(pos, 1);
    this.contactChangedEvent.emit(this.contacts.slice());
  }
}
