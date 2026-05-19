import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ContactList } from './contact-list/contact-list';

@Component({
  selector: 'cms-contacts',
  imports: [CommonModule, ContactList, RouterOutlet],
  templateUrl: './contacts.html',
  styleUrl: './contacts.css',
})
export class Contacts {}
