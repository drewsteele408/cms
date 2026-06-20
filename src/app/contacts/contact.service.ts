import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Contact as ContactModel } from '../contact.model';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private dbUrl = 'https://dscms-272f1-default-rtdb.firebaseio.com/contacts.json';
  contactListChangedEvent = new Subject<ContactModel[]>();
  contactSelectedEvent = new EventEmitter<ContactModel>();
  contacts: ContactModel[] = [];
  maxContactId: number = 0;

  constructor(private http: HttpClient) {}

  getContacts(): ContactModel[] {
    this.http.get<ContactModel[]>(this.dbUrl).subscribe(
      (contacts: ContactModel[]) => {
        this.contacts = contacts || [];
        this.maxContactId = this.getMaxId();
        this.contacts.sort((a: ContactModel, b: ContactModel) => {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });
        this.contactListChangedEvent.next(this.contacts.slice());
      },
      (error: any) => {
        console.error(error);
      }
    );

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

  getMaxId(): number {
    let maxId = 0;
    for (const contact of this.contacts) {
      const currentId = parseInt(contact.id, 10);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addContact(newContact: ContactModel) {
    if (!newContact) {
      return;
    }

    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    this.storeContacts();
  }

  updateContact(originalContact: ContactModel, newContact: ContactModel) {
    if (!originalContact || !newContact) {
      return;
    }

    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return;
    }

    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    this.storeContacts();
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
    this.storeContacts();
  }

  storeContacts() {
    const contactsListJson = JSON.stringify(this.contacts);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    this.http.put(this.dbUrl, contactsListJson, { headers: headers }).subscribe(() => {
      this.contactListChangedEvent.next(this.contacts.slice());
    });
  }
}
