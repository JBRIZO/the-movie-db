import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'safeHtml',
})
export class SafeHtmlPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): unknown {
    return value.replace(/\n/g, '<br/>');
  }
}
