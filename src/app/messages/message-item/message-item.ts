import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../message.model';
import { ContactService } from '../../contacts/contact.service';
import { Contact } from '../../contact.model';

@Component({
  selector: 'cms-message-item',
  imports: [],
  templateUrl: './message-item.html',
  styleUrl: './message-item.css',
})
export class MessageItem implements OnInit {
  @Input() message!: Message;
  messageSender: string = '';

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    const contact: Contact | null = this.contactService.getContact(this.message.sender);
    if (contact) {
      this.messageSender = contact.name;
    } else {
      this.messageSender = this.message.sender;
    }
  }
}
