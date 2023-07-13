package com.noteboard.note.dao;

import com.noteboard.note.model.Note;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NoteDao {
    List<Note> getAllNotes();

    void createNote(Note note);

    void updateNote(Note note);

    boolean deleteNoteById(String noteId);

    Note getNoteById(String noteId);

    List<Note> getNotesByAssignee(String assignee);

}
