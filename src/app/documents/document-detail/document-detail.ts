import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { WindRefService } from '../../wind-ref';

@Component({
  selector: 'cms-document-detail',
  imports: [RouterLink],
  templateUrl: './document-detail.html',
  styleUrl: './document-detail.css',
})
export class DocumentDetail implements OnInit {
  document: Document | null = null;
  nativeWindow: any;

  constructor(
    private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute,
    private windRefService: WindRefService
  ) {}

  ngOnInit() {
    this.nativeWindow = this.windRefService.getNativeWindow();

    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.document = this.documentService.getDocument(id);
    });
  }

  onView() {
    const url = this.document?.url;
    if (url) {
      this.nativeWindow.open(url);
    }
  }

  onDelete() {
    this.documentService.deleteDocument(this.document);
    this.router.navigateByUrl('/documents');
  }
}
