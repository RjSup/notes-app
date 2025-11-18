import { useEffect, useState } from "react";
import { fetchNotes, deleteNote, Note } from "../api/notesApi";
import NoteForm from "../components/NotesForm";
import styles from "../components/notelist.module.css"

export default function NotesList() {
    const [notes, setNotes] = useState<Note[]>([]);
    const [editingNote, setEditingNote] = useState<Note | null>(null);

    const loadNotes = () => {
        fetchNotes().then(setNotes);
    };

    useEffect(() => {
        loadNotes();
    }, []);

    return (
        <div className={styles.main}>
            <h1 className={styles.h1}>My Notes</h1>

            {/* CREATE MODE */}
            {!editingNote && (
                <div className={styles.createSection}>
                    <NoteForm
                        onSuccess={() => {
                            loadNotes();
                        }}
                    />
                </div>
            )}

            {/* EDIT MODE */}
            {editingNote && (
                <NoteForm
                    existingNote={editingNote}
                    onSuccess={() => {
                        setEditingNote(null);
                        loadNotes();
                    }}
                    onCancel={() => setEditingNote(null)}
                />
            )}

            <hr />

            {/* LIST */}
            {notes.map((note) => (
                <div
                    key={note.id}
                    style={{ border: "1px solid gray", padding: "1rem", marginTop: "1rem" }}
                >
                    <h3>{note.title}</h3>
                    <p>{note.content}</p>

                    <button onClick={() => setEditingNote(note)}>
                        Edit
                    </button>

                    <button
                        onClick={() => {
                            if (note.id) {
                                deleteNote(note.id).then(loadNotes);
                            }
                        }}
                        style={{ marginLeft: "1rem" }}
                    >
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
}
