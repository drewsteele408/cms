import { EventEmitter, Injectable } from '@angular/core';

import { Message as MessageModel } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messageChangedEvent = new EventEmitter<MessageModel[]>();
  messages: MessageModel[] = [];

  constructor() {
    this.messages = MOCKMESSAGES;
  }

  getMessages(): MessageModel[] {
    return this.messages.slice();
  }

  getMessage(id: string): MessageModel | null {
    for (const message of this.messages) {
      if (message.id === id) {
        return message;
      }
    }
    return null;
  }

  addMessage(message: MessageModel) {
    this.messages.push(message);
    this.messageChangedEvent.emit(this.messages.slice());
  }
}
