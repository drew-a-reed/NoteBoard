import { v4 as uuidv4 } from 'uuid';

export interface Note {
  noteId: string;
  noteDescription: string;
  dueDate: Date;
  assignee: string;
  attachments: string;
  priorityLevel: Priority;
  comments: string;
  noteStatus: NoteStatus;
}

export type NoteStatus = 'To Do' | 'Doing' | 'Review' | 'Done';

export type Priority = 'High' | 'Low' | 'Medium';

export const NULL_NOTE: Note = {
  noteId: uuidv4(),
  assignee: '',
  attachments: '',
  comments: '',
  noteDescription: '',
  dueDate: new Date(),
  priorityLevel: 'Low',
  noteStatus: 'To Do'
}
