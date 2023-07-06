import { DateService } from "../services/date/date.service";
import { DaysDuePipe } from "./days-due.pipe";

describe('DueDatePipe', () => {
  let pipe: DaysDuePipe;
  let dateServiceSpy: jasmine.SpyObj<DateService>;

  beforeEach(() => {
    dateServiceSpy = jasmine.createSpyObj<DateService>(['differenceInDays', 'getDate']);
    pipe = new DaysDuePipe(dateServiceSpy);
  });

  describe('transform', () => {
    it('should return the difference in days from the provided date', () => {
      dateServiceSpy.getDate.and.returnValue(new Date(2023, 3, 9, 0, 0, 0));
      dateServiceSpy.differenceInDays.and.returnValue(3);

      expect(pipe.transform(new Date(2023, 3, 12))).toBe(3);
    });
  })
})
