import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], filterString: string, propName: string): any {
    const result: any = []; //creating an array for holding result of the search
    if(!value || filterString === '' || propName === ''){ // checking whetherit is empty, null 
      return value;
    }
    value.forEach((a: any) => {
      if(a[propName].trim().toLowerCase().includes(filterString.toLowerCase())) { // filters value
        result.push(a); // pushing object into the result
      }
    });
    return result;
  }

}
