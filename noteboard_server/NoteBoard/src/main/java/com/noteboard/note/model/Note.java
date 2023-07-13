package com.noteboard.note.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

import java.util.Date;

@Entity
@Table(name = "notes")
public class Note {
    @jakarta.persistence.Id
    
    private String noteId;
    private String noteDescription;
    private Date dueDate;
    private String assignee;
    private String attachments;
    private String priorityLevel;
    private String comments;
    private String noteStatus;

    public Note(String noteId, String noteDescription, Date dueDate, String assignee, String attachments, String priorityLevel, String comments, String noteStatus) {
        this.noteId = noteId;
        this.noteDescription = noteDescription;
        this.dueDate = dueDate;
        this.assignee = assignee;
        this.attachments = attachments;
        this.priorityLevel = priorityLevel;
        this.comments = comments;
        this.noteStatus = noteStatus;
    }

    public Note() { }

    public void setNoteId(String noteId) { this.noteId = noteId; }

    public String getNoteId() { return noteId; }

    public String getNoteDescription() {
        return noteDescription;
    }

    public void setNoteDescription(String noteDescription) {
        this.noteDescription = noteDescription;
    }

    public Date getDueDate() {
        return dueDate;
    }

    public void setDueDate(Date dueDate) {
        this.dueDate = dueDate;
    }

    public String getAssignee() {
        return assignee;
    }

    public void setAssignee(String assignee) {
        this.assignee = assignee;
    }

    public String getAttachments() {
        return attachments;
    }

    public void setAttachments(String attachments) {
        this.attachments = attachments;
    }

    public String getPriorityLevel() {
        return priorityLevel;
    }

    public void setPriorityLevel(String priorityLevel) {
        this.priorityLevel = priorityLevel;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public String getNoteStatus() {
        return noteStatus;
    }

    public void setNoteStatus(String noteStatus) {
        this.noteStatus = noteStatus;
    }

}