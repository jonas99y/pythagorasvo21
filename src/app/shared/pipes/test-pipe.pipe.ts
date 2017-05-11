import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'testPipe'
})
export class TestPipePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    console.log(value);
    return value;
  }

}
