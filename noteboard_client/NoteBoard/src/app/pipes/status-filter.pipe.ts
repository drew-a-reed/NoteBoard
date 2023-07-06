import { Pipe, PipeTransform } from '@angular/core';
import { Note } from '../interfaces/note.interface';

@Pipe({
  name: 'statusFilter',
  standalone: true,
})
export class StatusFilterPipe implements PipeTransform {
  transform(notes: Note[], status: string): Note[] {
    console.log('Filtering notes:', notes); // Debug statement
    console.log('Filtering by status:', status); // Debug statement

    return notes.filter(note => note.noteStatus === status);
  }
}
