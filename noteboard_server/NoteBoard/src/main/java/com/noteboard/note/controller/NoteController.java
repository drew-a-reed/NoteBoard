package com.noteboard.note.controller;

import com.noteboard.note.dao.NoteDao;
import com.noteboard.note.model.Note;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/notes")
public class NoteController {
    private final NoteDao noteDao;

    public NoteController(NoteDao noteDao) {
        this.noteDao = noteDao;
    }

    @PostMapping
    public ResponseEntity<Void> createNote(@RequestBody Note note) {
        noteDao.createNote(note);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateNote(
            @PathVariable("id") int noteId,
            @RequestBody Note updatedNote) {
        Note existingNote = noteDao.getNoteById(noteId);
        if (existingNote == null) {
            return ResponseEntity.notFound().build();
        }
        updatedNote.setNoteId(existingNote.getNoteId());
        noteDao.updateNote(updatedNote);
        return ResponseEntity.ok("Note updated successfully");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteNoteById(@PathVariable("id") int noteId) {
        boolean success = noteDao.deleteNoteById(noteId);
        if (success) {
            return ResponseEntity.ok("Note deleted successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Note> getNoteById(@PathVariable("id") int noteId) {
        Note note = noteDao.getNoteById(noteId);
        if (note == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(note);
    }

    @GetMapping
    public ResponseEntity<List<Note>> getAllNotes() {
        List<Note> notes = noteDao.getAllNotes();
        return ResponseEntity.ok(notes);
    }

    @GetMapping("/assignee/{assignee}")
    public ResponseEntity<List<Note>> getNotesByAssignee(@PathVariable("assignee") String assignee) {
        List<Note> notes = noteDao.getNotesByAssignee(assignee);
        return ResponseEntity.ok(notes);
    }
}
