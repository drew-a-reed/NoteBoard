import { CdkDragDrop, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";
import { Component, Input, OnInit } from '@angular/core';
import { Observable, filter } from 'rxjs';
import { Note, NoteStatus } from "../interfaces/note.interface";
import { NoteService } from '../services/note/note.service';
import { NoteStore } from '../services/note/note.store';

@Component({
  selector: 'app-note-board',
  templateUrl: './note-board.component.html',
  styleUrls: ['./note-board.component.css']
})
export class NoteBoardComponent implements OnInit {
  todo: Note[] = [];
  done: Note[] = [];
  doing: Note[] = [];
  review: Note[] = [];
  notes$: Observable<Note[]> = this.noteStore.notes$;

  @Input() status!: string;

  constructor(
    private readonly noteService: NoteService,
    private readonly noteStore: NoteStore
  ) { }

  ngOnInit(): void {
    this.noteStore.fetchNotes();
    this.noteStore.notes$.pipe(
      filter(n => n?.length > 0)
    ).subscribe({
      next: (notes) => {
        this.todo = notes.filter(n => n.noteStatus === 'To Do');
        this.doing = notes.filter(n => n.noteStatus === 'Doing');
        this.review = notes.filter(n => n.noteStatus === 'Review');
        this.done = notes.filter(n => n.noteStatus === 'Done');
      }
    });

    this.noteService.noteAdded.subscribe((newNote: Note) => {
      this.onNoteAdded(newNote);
    });
  }

  onNoteAdded(newNote: Note) {
    this.noteService.addNote(newNote);
    this.noteStore.fetchNotes();
  }

  onNoteDeleted(id: string) {
    this.noteStore.deleteNote(id);
  }

  onDrop(event: CdkDragDrop<Note[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const toStatus = event.container.id as NoteStatus;
      const note = event.item.data;
      note.noteStatus = toStatus;
      this.noteService.editNote(note)
        .subscribe(updatedNote => {
          transferArrayItem(
            event.previousContainer.data,
            event.container.data,
            event.previousIndex,
            event.currentIndex
          );
        }, error => {
          console.error('Could not update note status:', error);
        });
    }
  }


}
