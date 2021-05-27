import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(array: any[], searchText: any): any[] {
    if (!searchText) {
      return array;
    }
    else {
      let search = searchText.toLowerCase();
      return array.filter(x => { return x.tagDescription.toLowerCase().includes(search) || x.tagDescription.toLowerCase().includes(search) })
    }
  }

}
