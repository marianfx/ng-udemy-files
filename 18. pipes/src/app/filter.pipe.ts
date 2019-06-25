import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false // this makes it to be recalculated everytime data changes; otherwise it doesn't
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterString: string, propName: string): any {
    if (!value || value.length === 0) {
      return value;
    }

    if (!filterString)
      return value;

    const resultArray = [];
    for (const item of value) {
      if (item[propName] === filterString)
        resultArray.push(item);
    }

    return resultArray;
  }

}
