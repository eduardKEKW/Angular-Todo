import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterModal'
})
export class FilterModalPipe implements PipeTransform {

  transform(value: {}, ...args: unknown[]): unknown {
    return value[args[0] as any];
  }

}
