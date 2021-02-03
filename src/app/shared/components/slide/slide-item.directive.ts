import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[slideItem]',
})
export class SlideItemDirective {
  constructor(public hostRef: ElementRef) {}
}
