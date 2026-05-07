import { EventEmitter, Injectable } from '@angular/core';

import { Document as DocumentModel } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  documentSelectedEvent = new EventEmitter<DocumentModel>();
  documents: DocumentModel[] = [];

  constructor() {
    this.documents = MOCKDOCUMENTS;
  }

  getDocuments(): DocumentModel[] {
    return this.documents.slice();
  }

  getDocument(id: string): DocumentModel | null {
    for (const document of this.documents) {
      if (document.id === id) {
        return document;
      }
    }
    return null;
  }
}
