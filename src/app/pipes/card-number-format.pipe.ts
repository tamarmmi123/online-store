import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cardNumberFormat',
  standalone: true
})
export class CardNumberFormatPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    return value.replace(/\D/g, '')
                .replace(/(.{4})/g, '$1 ')
                .trim();
  }
}
