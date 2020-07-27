import { Pipe, PipeTransform } from '@angular/core';
import { of, Observable } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';

@Pipe({
  name: 'img'
})
export class ImgPipe implements PipeTransform {

  constructor(
    private userService: UserService
  ) {}

  transform(id: string): Observable<string> {
    return this.userService.getImg(id);
  }

}
