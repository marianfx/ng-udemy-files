import { PipeTransform, Pipe } from "@angular/core";

@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {


  transform(value: any, limit: number) {
    limit = limit != null ? limit : 10;
    let added = value.length > limit ? "..." : "";
    return value.substr(0, limit) + added;
  }
}
