import { Pipe, PipeTransform } from "@angular/core";
import { DateService } from "../services/date/date.service";

@Pipe({
  name: 'daysDue',
  standalone: true
})
export class DaysDuePipe implements PipeTransform {
  constructor(private readonly dateService: DateService) { }

  transform(value: Date): number {
    const today = this.dateService.getDate();
    return this.dateService.differenceInDays(today, value);
  }
}
