import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './../../interfaces/user';
import { UserService } from './../../services/user.service';

@Pipe({
  name: 'doc'
})
export class DocPipe implements PipeTransform {

  constructor(
    private userService: UserService,
  ) {}


  transform(value: string, ...args: unknown[]): Observable<User> {
    return this.userService.getUser(value);
  }

}
