import { Component, Output } from '@angular/core';
import { NULL_NOTE, Note } from '../interfaces/note.interface';
import { NoteService } from '../services/note/note.service';
import { NoteStore } from '../services/note/note.store';
import { of } from 'rxjs';

@Component({
  selector: 'app-new-note',
  templateUrl: './new-note.component.html',
  styleUrls: ['./new-note.component.css']
})
export class NewNoteComponent {
  newNoteDescription: string = 'new-note';
  @Output() newNote: Note = { ...NULL_NOTE };
  newNoteVisible = false;

  constructor(private NoteService: NoteService, private noteStore: NoteStore) { }

  showNewNote() {
    this.newNoteVisible = true;
    const newNoteContainer = document.querySelector('.new-note-container');
    if (newNoteContainer) {
      newNoteContainer.classList.add('dark-background');
    }
  }

  hideNewNote() {
    this.newNoteVisible = false;
    const newNoteContainer = document.querySelector('.new-note-container');
    if (newNoteContainer) {
      newNoteContainer.classList.remove('dark-background');
    }
  }

  addNote() {
    this.noteStore.addNote(of(this.newNote));
    this.newNote = { ...NULL_NOTE };
    this.hideNewNote();
  }
}
