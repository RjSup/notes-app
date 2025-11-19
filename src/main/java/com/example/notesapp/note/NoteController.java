package com.example.notesapp.note;

import org.springframework.web.bind.annotation.*;

import java.util.List;

// map the controller to the notes route
@RestController()
@RequestMapping(path = "/api/notes")
// give it to the frontend
@CrossOrigin(origins = "http://localhost:3000")
public class NoteController {
    private final NoteService service;

    public NoteController(NoteService service) {
        this.service = service;
    }

    @GetMapping()
    public List<Note> getAllNotes() {
        return service.getAllNotes();
    }

    @GetMapping("/{id}")
    public Note findNoteById(@PathVariable Long id) {
        return service.getNoteById(id).orElseThrow();
    }

    @PostMapping
    public Note createNote(@RequestBody Note note) {
        return service.createNote(note);
    }

    @PutMapping("/{id}")
    public Note updateNote(@PathVariable Long id, @RequestBody Note noteData) {
        return service.updateNote(id, noteData);
    }

    @DeleteMapping("/{id}")
    public void deleteNote(@PathVariable Long id) {
        service.deleteNode(id);
    }


}
