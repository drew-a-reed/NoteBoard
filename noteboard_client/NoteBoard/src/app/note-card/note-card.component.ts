import { Component, Input } from '@angular/core';
import { Note, NoteStatus } from '../interfaces/note.interface';
import { NoteService } from '../services/note/note.service';
import { NoteStore } from '../services/note/note.store';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.css']
})
export class NoteCardComponent {
  @Input() note!: Note;
  isExpanded = false;


  constructor(
    private readonly noteService: NoteService,
    private readonly noteStore: NoteStore
  ) { }

  deleteNote() {
    if (confirm(`Delete ${this.note.noteDescription}?`)) {
      this.noteStore.deleteNote(this.note.noteId)
    }
  }

  editNotePush() {
    console.log('called this editNote')
    this.noteService.editNotePushed.emit(this.note);
  }

  expandNote() {
    this.isExpanded = !this.isExpanded;
  }

  updateStatus(newStatus: NoteStatus): void {
    this.noteService.updateNoteStatus(this.note, newStatus);
  }

}
