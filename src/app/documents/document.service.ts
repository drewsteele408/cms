import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

import { Document as DocumentModel } from './document.model';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  private dbUrl = 'https://dscms-272f1-default-rtdb.firebaseio.com/documents.json';
  documentListChangedEvent = new Subject<DocumentModel[]>();
  documentSelectedEvent = new EventEmitter<DocumentModel>();
  documents: DocumentModel[] = [];
  maxDocumentId: number = 0;

  constructor(private http: HttpClient) {}

  getDocuments(): DocumentModel[] {
    this.http.get<DocumentModel[]>(this.dbUrl).subscribe(
      (documents: DocumentModel[]) => {
        this.documents = documents || [];
        this.maxDocumentId = this.getMaxId();
        this.documents.sort((a: DocumentModel, b: DocumentModel) => {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });
        this.documentListChangedEvent.next(this.documents.slice());
      },
      (error: any) => {
        console.error(error);
      }
    );

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

  getMaxId(): number {
    let maxId = 0;
    for (const document of this.documents) {
      const currentId = parseInt(document.id, 10);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addDocument(newDocument: DocumentModel) {
    if (!newDocument) {
      return;
    }

    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);
    this.storeDocuments();
  }

  updateDocument(originalDocument: DocumentModel, newDocument: DocumentModel) {
    if (!originalDocument || !newDocument) {
      return;
    }

    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return;
    }

    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    this.storeDocuments();
  }

  deleteDocument(document: DocumentModel | null) {
    if (!document) {
      return;
    }

    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }

    this.documents.splice(pos, 1);
    this.storeDocuments();
  }

  storeDocuments() {
    const documentsListJson = JSON.stringify(this.documents);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    this.http.put(this.dbUrl, documentsListJson, { headers: headers }).subscribe(() => {
      this.documentListChangedEvent.next(this.documents.slice());
    });
  }
}
