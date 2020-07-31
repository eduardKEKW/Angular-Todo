import { Pipe, PipeTransform } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/interfaces/user';
import { Observable } from 'rxjs';

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
