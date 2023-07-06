import { Injectable } from '@angular/core';
import { differenceInCalendarDays, format, formatDuration, intervalToDuration, isValid } from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  private defaultFormat = 'MM/dd/yyyy';

  getDate(input?: number | string | Date): Date {
    if (input && isValid(new Date(input))) {
      return new Date(input);
    }

    return new Date();
  }

  public getDateString(input: Date, inputFormat?: string): string {
    if (isValid(input)) {
      if (!inputFormat) {
        return format(input, this.defaultFormat);
      }
      return format(input, inputFormat);
    }
    console.error('not valid', input)
    return '';
  }

  /**
   * Returns a string with human readble time duration
   * @param end DateTime for end date
   * @returns String
   * @example daysUntil(new Date()): '2 years, 15 days, 23 hours'
   */
  public timeUntil(start: Date, end: Date): string {
    const duration = intervalToDuration({
      start,
      end
    });

    return formatDuration(duration, {
      delimiter: ', '
    })
  }

  /**
   * Returns a number for difference in days between two dates
   * @param start Start date
   * @param end End date
   * @returns number
   * @example differenceInDays(new Date(2023, 4, 9), new Date(2023, 4, 13)): 4
   */
  public differenceInDays(start: Date, end: Date): number {
    if (!isValid(end)) {
      end = this.getDate(end);
    }
    return differenceInCalendarDays(end, start);
  }
}
