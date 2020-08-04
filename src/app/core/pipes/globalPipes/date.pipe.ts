import { formatDate } from '@angular/common';
import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import { firestore } from 'firebase/app';
import Timestamp = firestore.Timestamp;
import * as moment from 'moment';

@Pipe({
  name: 'fireDate'
})
export class DatePipe implements PipeTransform {

  constructor(@Inject(LOCALE_ID) private locale: string) {
  }

  transform(timestamp: Timestamp, format?: string): string {
    if (!timestamp || !timestamp.toDate) {
      return;
    }

    if (format === 'moment') {
      return moment(timestamp.toDate()).fromNow();
    }

    return formatDate(timestamp.toDate(), format || 'medium', this.locale);
  }
}
