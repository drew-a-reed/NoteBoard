import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Note, NoteStatus } from '../../interfaces/note.interface';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private readonly apiUrl = 'http://localhost:8080'; // Replace with your API URL

  @Output() noteAdded = new EventEmitter<Note>();
  @Output() editNotePushed = new EventEmitter<Note>();
  @Output() noteEdited = new EventEmitter<Note>();

  constructor(private readonly http: HttpClient) { }

  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(`${this.apiUrl}/notes`);
  }

  addNote(note: Note): Observable<Note> {
    return this.http.post<Note>(`${this.apiUrl}/notes`, note);
  }

  editNote(updatedNote: Note): Observable<Note> {
    return this.http.put<Note>(`${this.apiUrl}/notes/${updatedNote.noteId}`, updatedNote);
  }

  updateNoteStatus(updatedNote: Note, toStatus: NoteStatus): Observable<Note> {
    updatedNote.noteStatus = toStatus;
    return this.http.put<Note>(`${this.apiUrl}/notes/${updatedNote.noteId}`, updatedNote);
  }

  deleteNote(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/notes/${id}`);
  }
}
