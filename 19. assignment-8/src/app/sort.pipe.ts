import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: any[], propName: string): any {
    let other = value.slice();
    other.sort((a, b) => a[propName] < b[propName] ? -1 : (a[propName] > b[propName] ? 1 : 0));
    return other;
  }

}
