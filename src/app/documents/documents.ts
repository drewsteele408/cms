import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Document } from './document.model';
import { DocumentList } from './document-list/document-list';
import { DocumentDetail } from './document-detail/document-detail';

@Component({
  selector: 'cms-documents',
  imports: [CommonModule, DocumentList, DocumentDetail],
  templateUrl: './documents.html',
})
export class Documents {
  selectedDocument: Document | null = null;
}
