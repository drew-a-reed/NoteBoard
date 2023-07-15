package com.noteboard.note.controller;

import com.noteboard.note.dao.NoteDao;
import com.noteboard.note.model.Note;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
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
        try {
            noteDao.createNote(note);
            URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                    .path("/{id}")
                    .buildAndExpand(note.getNoteId())
                    .toUri();
            return ResponseEntity.created(location).build();
        } catch (Exception e) {
            // Handle the error
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateNote(
            @PathVariable("id") String noteId,
            @RequestBody Note updatedNote) {
        Note existingNote = noteDao.getNoteById(noteId);
        if (existingNote == null) {
            return ResponseEntity.notFound().build();
        }
        updatedNote.setNoteId(existingNote.getNoteId());
        noteDao.updateNote(updatedNote);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteNoteById(@PathVariable("id") String noteId) {
        boolean success = noteDao.deleteNoteById(noteId);
        if (success) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @GetMapping("/{id}")
    public ResponseEntity<Note> getNoteById(@PathVariable("id") String noteId) {
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
