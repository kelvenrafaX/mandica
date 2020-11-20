import { Directive, Renderer2, ElementRef, HostListener, OnInit, OnDestroy, Input, Output } from '@angular/core';
import { EventEmitter } from 'protractor';

@Directive({
  selector: '[appInputMoney]'
})
export class InputMoneyDirective {

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
  }

  @HostListener('keyup') onKeyup() {
    const input = this.elementRef.nativeElement;
    let value = input.value.replace('R$ ', '').replace('.', '').replace(',', '');
    value = value === '' ? '0' : value;
    value = value.substring(0, value.length - 2) + '.' + value.substr(-2);
    input.value = 'R$ ' + parseFloat(value).toLocaleString('pt-Br', {
      style: 'decimal',
      maximumFractionDigits: 2,
      minimumFractionDigits: 2
    });
  }

  @HostListener('load') onLoad() {
    const input = this.elementRef.nativeElement;
    let value = input.value.replace('R$ ', '').replace('.', '').replace(',', '');
    value = value === '' ? '0' : value;
    value = value.substring(0, value.length - 2) + '.' + value.substr(-2);
    input.value = 'R$ ' + parseFloat(value).toLocaleString('pt-Br', {
      style: 'decimal',
      maximumFractionDigits: 2,
      minimumFractionDigits: 2
    });
  }
}
