package com.noteboard.note.dao;

import com.noteboard.note.model.Note;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.util.ArrayList;
import java.util.List;

@Service
public class JdbcNoteDao implements NoteDao {

    private JdbcTemplate jdbcTemplate;

    public JdbcNoteDao(DataSource ds){this.jdbcTemplate = new JdbcTemplate(ds);}

    private Note noteObjectMapper(SqlRowSet results) {

        Note note = new Note();
        note.setNoteId(results.getString("note_id"));
        note.setNoteDescription(results.getString("note_description"));
        note.setDueDate(results.getDate("due_date"));
        note.setAssignee(results.getString("assignee"));
        note.setAttachments(results.getString("attachments"));
        note.setPriorityLevel(results.getString("priority_level"));
        note.setComments(results.getString("comments"));
        note.setNoteStatus(results.getString("note_status"));

        return note;
    }

    @Override
    public List<Note>  getAllNotes() {
        String sql = "SELECT * FROM notes";
        SqlRowSet results = this.jdbcTemplate.queryForRowSet(sql);
        List<Note> notes = new ArrayList<>();
        while (results.next()){
            notes.add(noteObjectMapper(results));
        }
        return notes;
    };

    @Override
    public void createNote(Note note) {
        String sql = "INSERT INTO notes (note_id, note_description, due_date, assignee, attachments, priority_level, comments, note_status) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        jdbcTemplate.update(sql, note.getNoteId(), note.getNoteDescription(), note.getDueDate(), note.getAssignee(),
                note.getAttachments(), note.getPriorityLevel(), note.getComments(), note.getNoteStatus());
    }

    @Override
    public void updateNote(Note note) {
        String sql = "UPDATE notes SET note_description = ?, due_date = ?, assignee = ?, " +
                "attachments = ?, priority_level = ?, comments = ?, note_status = ? WHERE note_id = ?";
        jdbcTemplate.update(sql, note.getNoteDescription(), note.getDueDate(), note.getAssignee(),
                note.getAttachments(), note.getPriorityLevel(), note.getComments(), note.getNoteStatus(), note.getNoteId());
    }


    @Override
    public boolean deleteNoteById(int noteId) {
        String sql = "DELETE FROM notes WHERE note_id =?";
        jdbcTemplate.update(sql,noteId);
        return true;
    }

    @Override
    public Note getNoteById(int noteId) {
        String sql = "SELECT * FROM notes WHERE note_id=?";
        SqlRowSet results = this.jdbcTemplate.queryForRowSet(sql, noteId);
        Note note = null;
        if(results.next()){
            note = noteObjectMapper(results);
        }
        return note;
    }



    @Override
    public List<Note> getNotesByAssignee(String assignee) {
        String sql = "SELECT * FROM notes WHERE assignee LIKE '%' || ? || '%'";
        SqlRowSet results = this.jdbcTemplate.queryForRowSet(sql, assignee);
        List<Note> notes = new ArrayList<>();
        while (results.next()) {
            notes.add(noteObjectMapper(results));
        }
        return notes;
    }


}
