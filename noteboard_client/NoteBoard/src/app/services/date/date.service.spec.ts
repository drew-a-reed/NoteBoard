import { DateService } from "./date.service";

describe('DateService', () => {
  let service: DateService;

  beforeEach(() => {
    service = new DateService();
  });

  describe('getDate', () => {
    let today: Date;

    beforeEach(() => {
      today = new Date();
    })
    it('should return default date given null input', () => {
      const result = service.getDate();

      expect(result.getDate()).toEqual(today.getDate());
    });

    it('should return a date object given a valid numeric date', () => {
      const timestamp = today.getTime();
      const result = service.getDate(timestamp);

      expect(result.getTime()).toEqual(timestamp);
    });

    it('should return a date object given a valid date string', () => {
      const isoString = today.toISOString();
      const result = service.getDate(isoString);

      expect(result.toISOString()).toEqual(isoString);
    });

    it('should return a date object given a valid date object', () => {
      const result = service.getDate(today);

      expect(result.toISOString()).toEqual(today.toISOString());
    });
  });

  describe('getDateString', () => {
    it('should return an empty string given an invalid date', () => {
      const result = service.getDateString('invalid' as any as Date);

      expect(result).toEqual('');
    });

    it('should return a string with default format given empty format value', () => {
      const today = new Date(2023, 3, 9, 0, 0, 0);
      const result = service.getDateString(today);

      expect(result).toEqual('04/09/2023');
    });

    it('should return string formatted as expected', () => {
      const today = new Date(2023, 3, 9, 0, 0, 0);
      const result = service.getDateString(today, 'MMMM yyyy');

      expect(result).toBe('April 2023');
    });
  });

  describe('timeUntil', () => {
    it('should return a human readable time duration string', () => {
      const end = new Date(2023, 3, 9, 0, 0, 0);
      const start = new Date(2023, 3, 3, 0, 0, 0);
      const result = service.timeUntil(start, end);

      expect(result).toBe('6 days')
    });
  });

  describe('differenceInDays', () => {
    it('should return the difference in calendar days between two dates as a number', () => {
      const start = new Date(2023, 3, 3, 0, 0, 0);
      const end = new Date(2023, 3, 9, 0, 0, 0);
      const result = service.differenceInDays(start, end);

      expect(result).toBe(6);
    })
  })
});
