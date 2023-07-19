import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Note, NoteStatus } from '../../interfaces/note.interface';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private readonly apiUrl = 'http://localhost:8080'; // Replace with your API URL
  private notes = new BehaviorSubject<Note[]>([]);

  @Output() noteAdded = new EventEmitter<Note>();
  @Output() editNotePushed = new EventEmitter<Note>();
  @Output() noteEdited = new EventEmitter<Note>();

  notes$ = this.notes.asObservable();

  constructor(private readonly http: HttpClient) { }

  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(`${this.apiUrl}/notes`);
  }

  addNote(note: Note): void {
    this.http.post<Note>(`${this.apiUrl}/notes`, note).subscribe(newNote => {
      this.notes.next([...this.notes.getValue(), newNote]);
    });
  }

  editNote(updatedNote: Note): Observable<Note> {
    return this.http.put<Note>(`${this.apiUrl}/notes/update/${updatedNote.noteId}`, updatedNote);
  }

  deleteNote(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/notes/delete/${id}`);
  }

}
