import { Directive } from '@angular/core';

@Directive({
  selector: '[cmsDropdown]',
  host: {
    '[class.open]': 'isOpen',
    '(click)': 'toggleOpen()',
  },
})
export class DropdownDirective {
  isOpen = false;

  toggleOpen() {
    this.isOpen = !this.isOpen;
  }
}
