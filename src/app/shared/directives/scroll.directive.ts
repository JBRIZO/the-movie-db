import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appScroll]',
})
export class ScrollDirective {
  constructor(private element: ElementRef) {}

  @HostListener('wheel', ['$event'])
  public onScroll(event: WheelEvent) {
    event.preventDefault();
    this.element.nativeElement.scrollLeft += event.deltaY;
  }
}
