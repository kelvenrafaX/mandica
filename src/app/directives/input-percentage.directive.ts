import { Directive, Renderer2, ElementRef, HostListener, OnInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appInputPercentage]'
})
export class InputPercentageDirective {

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
  }

  @HostListener('keyup') onKeyup() {
    const input = this.elementRef.nativeElement;
    input.value = parseInt(input.value === '' ? 0 : (input.value > 100 ? 100 : (input.value < 0 ? 0 : input.value)), 0);
  }
}
