import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NULL_NOTE, Note } from '../interfaces/note.interface';
import { NoteService } from '../services/note/note.service';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.css']
})
export class EditNoteComponent implements OnInit {
  @Input() note!: Note;
  @Output() noteEdited = new EventEmitter<Note>();
  isExpanded = false;

  constructor(private noteService: NoteService) {
    this.note = { ...NULL_NOTE };
  }

  ngOnInit(): void {
    this.noteService.editNotePushed.subscribe((noteToEdit: Note) => {
      this.expandNote(noteToEdit);
    });
  }

  expandNote(noteToEdit: Note) {
    this.note = noteToEdit;
    this.isExpanded = true;
    const editNoteContainer = document.querySelector('.edit-note-container');
    if (editNoteContainer) {
      editNoteContainer.classList.add('dark-background');
    }
  }


  hideEditNote() {
    this.isExpanded = false;
    const editNoteContainer = document.querySelector('.edit-note-container');
    if (editNoteContainer) {
      editNoteContainer.classList.remove('dark-background');
    }
  }

  onSaveNote() {
    this.noteService.editNote(this.note); // call the editNote method on the NoteService with the updated note
    this.noteEdited.emit(this.note); // emit the updated note to the parent component
    this.hideEditNote(); // hide the edit note container
  }

}
