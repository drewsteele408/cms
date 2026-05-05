import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { Document } from '../document.model';
import { DocumentItem } from '../document-item/document-item';

@Component({
  selector: 'cms-document-list',
  imports: [CommonModule, DocumentItem],
  templateUrl: './document-list.html',
  styleUrl: './document-list.css',
})
export class DocumentList {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [
    new Document(
      '1',
      'CIT 260 - Object Oriented Programming',
      'Learn object-oriented programming fundamentals using JavaScript.',
      'https://content.byui.edu/file/260-course-description.pdf',
      []
    ),
    new Document(
      '2',
      'CIT 366 - Full Web Stack Development',
      'Learn how to develop modern web applications using the MEAN stack.',
      'https://content.byui.edu/file/366-course-description.pdf',
      []
    ),
    new Document(
      '3',
      'CIT 425 - Data Warehousing',
      'Explore data warehouse modeling, ETL, and analytics concepts.',
      'https://content.byui.edu/file/425-course-description.pdf',
      []
    ),
    new Document(
      '4',
      'CIT 460 - Enterprise Development',
      'Design and build scalable enterprise-level applications.',
      'https://content.byui.edu/file/460-course-description.pdf',
      []
    ),
    new Document(
      '5',
      'CIT 495 - Senior Practicum',
      'Complete a capstone practicum project with a real-world team.',
      'https://content.byui.edu/file/495-course-description.pdf',
      []
    ),
  ];

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }
}
