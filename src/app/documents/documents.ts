import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DocumentList } from './document-list/document-list';

@Component({
  selector: 'cms-documents',
  imports: [CommonModule, DocumentList, RouterOutlet],
  templateUrl: './documents.html',
})
export class Documents {}
