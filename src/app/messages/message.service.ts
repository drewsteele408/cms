import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Message as MessageModel } from './message.model';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private dbUrl = 'https://dscms-272f1-default-rtdb.firebaseio.com/messages.json';
  messageChangedEvent = new EventEmitter<MessageModel[]>();
  messages: MessageModel[] = [];
  maxMessageId: number = 0;

  constructor(private http: HttpClient) {}

  getMessages(): MessageModel[] {
    this.http.get<MessageModel[]>(this.dbUrl).subscribe(
      (messages: MessageModel[]) => {
        this.messages = messages || [];
        this.maxMessageId = this.getMaxId();
        this.messageChangedEvent.emit(this.messages.slice());
      },
      (error: any) => {
        console.error(error);
      }
    );

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
    this.maxMessageId++;
    message.id = this.maxMessageId.toString();
    this.messages.push(message);
    this.storeMessages();
  }

  getMaxId(): number {
    let maxId = 0;
    for (const message of this.messages) {
      const currentId = parseInt(message.id, 10);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  storeMessages() {
    const messagesListJson = JSON.stringify(this.messages);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    this.http.put(this.dbUrl, messagesListJson, { headers: headers }).subscribe(() => {
      this.messageChangedEvent.emit(this.messages.slice());
    });
  }
}
