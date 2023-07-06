import { Component, Output } from '@angular/core';
import { NULL_NOTE, Note } from '../interfaces/note.interface';
import { NoteService } from '../services/note/note.service';

@Component({
  selector: 'app-new-note',
  templateUrl: './new-note.component.html',
  styleUrls: ['./new-note.component.css']
})
export class NewNoteComponent {
  newNoteDescription: string = 'new-note';
  @Output() newNote: Note = { ...NULL_NOTE };
  newNoteVisible = false;

  constructor(private NoteService: NoteService) { }

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


  addNote(newNote: Note) {
    this.NoteService.noteAdded.emit({
      ...newNote,
      noteStatus: 'To Do'
    });
    this.newNote = { ...NULL_NOTE };
    this.hideNewNote();
  }
}
