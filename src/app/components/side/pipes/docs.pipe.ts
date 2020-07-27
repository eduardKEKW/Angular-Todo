import { Pipe, PipeTransform } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { from } from 'rxjs';

@Pipe({
  name: 'docs'
})
export class DocsPipe implements PipeTransform {

  constructor(
    private userService: UserService,
  ) { }

  transform(usersPaths: any): any {
    return this.userService.getUsers();
  }

}
