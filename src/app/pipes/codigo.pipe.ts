import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'codigo'})
export class CodigoPipe implements PipeTransform {
  transform(value: number, qtd: number): string {
    return ('0'.repeat(qtd) + value).substr(-qtd);
  }
}
