import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MessageEdit } from '../message-edit/message-edit';
import { MessageItem } from '../message-item/message-item';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  imports: [CommonModule, MessageItem, MessageEdit],
  templateUrl: './message-list.html',
  styleUrl: './message-list.css',
})
export class MessageList {
  messages: Message[] = [
    new Message('1', 'Homework', 'Can we review chapter 3 tomorrow?', 'Alice'),
    new Message('2', 'Meeting', 'Please join the team sync at 2 PM.', 'Bob'),
    new Message('3', 'Reminder', 'Submit your assignment by Friday.', 'Professor Lee'),
  ];

  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}
