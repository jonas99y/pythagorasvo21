import { Pipe, PipeTransform } from '@angular/core';
import { UserService } from '../services';
import { User } from '../models';

@Pipe({
  name: 'findUser'
})
export class FindUserPipe implements PipeTransform {

  constructor(private userService: UserService) { }

  transform(value: any, args?: any): any {
    return this.userService.findUserAfterKey(value);

  }

}
