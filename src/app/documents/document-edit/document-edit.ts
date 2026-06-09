import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-edit',
  imports: [CommonModule, FormsModule],
  templateUrl: './document-edit.html',
  styleUrl: './document-edit.css',
})
export class DocumentEdit implements OnInit {
  originalDocument: Document | null = null;
  document: Document = new Document('', '', '', '', []);
  editMode: boolean = false;

  constructor(
    private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
      if (id === undefined || id === null) {
        this.editMode = false;
        return;
      }

      this.originalDocument = this.documentService.getDocument(id);
      if (this.originalDocument === undefined || this.originalDocument === null) {
        return;
      }

      this.editMode = true;
      this.document = JSON.parse(JSON.stringify(this.originalDocument));
    });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const children = this.editMode && this.originalDocument?.children
      ? this.originalDocument.children
      : [];

    const newDocument = new Document(
      '',
      value.name,
      value.description,
      value.url,
      children
    );

    if (this.editMode && this.originalDocument) {
      this.documentService.updateDocument(this.originalDocument, newDocument);
    } else {
      this.documentService.addDocument(newDocument);
    }

    this.router.navigateByUrl('/documents');
  }

  onCancel() {
    this.router.navigateByUrl('/documents');
  }
}
