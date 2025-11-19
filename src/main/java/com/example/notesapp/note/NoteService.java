package com.example.notesapp.note;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NoteService {
    private final NoteRepository noteRepository;

    public NoteService(NoteRepository noteRepository) {
        this.noteRepository = noteRepository;
    }

    public List<Note> getAllNotes() {
        return noteRepository.findAll();
    }

    public Optional<Note> getNoteById(Long id) {
        return noteRepository.findById(id);
    }

    public Note createNote(Note note) {
        return noteRepository.save(note);
    }

    public Note updateNote(Long id, Note noteData) {
        Note note = noteRepository.findById(id).orElseThrow();
        note.setTitle(noteData.getTitle());
        note.setContent(noteData.getContent());

        return noteRepository.save(note);
    }

    public void deleteNode(Long id) {
        noteRepository.deleteById(id);
    }
}
