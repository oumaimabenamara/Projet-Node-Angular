import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(array: any[], searchText: any): any[] {
    if (!searchText) {
      return array;
    }
    else{
      let search = searchText.toLowerCase();
      return array.filter(x=>{ return x?.eventName?.toLowerCase().includes(search) || x?.eventType?.toLowerCase().includes(search) || x?.location?.toLowerCase().includes(search) || x?.numberOfTickets.toString()?.includes(search) || x?.price?.includes(search)})
    }
  }

}
