import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'padding'
})
export class PaddingPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
