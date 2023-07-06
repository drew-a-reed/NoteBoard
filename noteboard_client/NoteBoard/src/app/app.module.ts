import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { EditNoteComponent } from './edit-note/edit-note.component';
import { NewNoteComponent } from './new-note/new-note.component';
import { NoteBoardComponent } from './note-board/note-board.component';
import { NoteCardComponent } from './note-card/note-card.component';
import { DaysDuePipe } from './pipes/days-due.pipe';
import { StatusFilterPipe } from './pipes/status-filter.pipe';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NoteCardComponent,
    NoteBoardComponent,
    NewNoteComponent,
    EditNoteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    DragDropModule,
    StatusFilterPipe,
    DaysDuePipe,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
