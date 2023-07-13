import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable, switchMap, tap, catchError, of, EMPTY } from 'rxjs';
import { Note } from '../../interfaces/note.interface';
import { NoteService } from './note.service';

interface StoreState {
  notes: Note[],
  selectedNote: Note,
}

@Injectable({
  providedIn: 'root'
})
export class NoteStore extends ComponentStore<StoreState> {
  public readonly notes$ = this.select(state => state.notes);
  public readonly selected$ = this.select(state => state.selectedNote);

  public readonly fetchNotes = this.effect((_: Observable<void>) =>
    _.pipe(
      switchMap(() => this.noteService.getNotes()),
      tap(notes => this.updateNotes(notes))
    )
  );

  public readonly addNote = this.effect((note: Observable<Note>) =>
    note.pipe(
      tap(noteData => this.noteService.addNote(noteData))
    )
  );

  public readonly deleteNote = this.effect((id$: Observable<string>) =>
  id$.pipe(
    switchMap(id =>
      this.noteService.deleteNote(id).pipe(
        tap(() => {
          const currentNotes = this.get().notes;
          console.log('currentNotes', {
            storeNotes: currentNotes,
            onlyIds: currentNotes.map(n => n.noteId),
            selectedId: id,
            found: currentNotes.map(n => n.noteId).includes(id)
          })
          this.updateNotes(currentNotes.filter(n => n.noteId !== id));
        }),
      )
    ),
    catchError((err: any) => {
      console.error(err);
      return EMPTY;
    })
  )
)



  public readonly selectNote = this.effect((note: Observable<Note>) =>
    note.pipe(
      tapResponse(
        (note) => this.updateSelectedNote(note),
        (err) => console.error(err)
      )
    ));

  private readonly updateNotes = this.updater((state, notes: Note[]) => ({
    ...state,
    notes
  }));

  private readonly updateSelectedNote = this.updater((state, selectedNote: Note) => ({
    ...state,
    selectedNote
  }));

  constructor(private readonly noteService: NoteService) {
    super({
      notes: [],
      selectedNote: {} as Note
    })
    console.log('id', Math.random())
  }
}
