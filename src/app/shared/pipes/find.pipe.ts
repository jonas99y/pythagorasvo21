import { Pipe, PipeTransform } from '@angular/core';
import { DBHelperService } from '../services';
import { User } from '../models';

@Pipe({
  name: 'find'
})
export class FindPipe implements PipeTransform {

  constructor(private dbHelperService: DBHelperService) { }

  transform(value: any, args?: any): any {
    return this.dbHelperService.findInNodeAfterKey(args, value);

  }

}
