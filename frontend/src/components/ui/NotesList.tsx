import { useEffect, useState } from "react";
import { fetchNotes, deleteNote, Note } from "../../api/notesApi";
import NoteForm from "./NotesForm";
import styles from "./notelist.module.css"

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
                <div key={note.id} className={styles.noteCard}>
                    <h3 className={styles.noteTitle}>{note.title}</h3>
                    <p className={styles.noteContent}>{note.content}</p>

                    <button
                        className={styles.editButton}
                        onClick={() => setEditingNote(note)}
                    >
                        Edit
                    </button>

                    <button
                        className={styles.deleteButton}
                        onClick={() => {
                            if (note.id) deleteNote(note.id).then(loadNotes);
                        }}
                        style={{ marginLeft: "0.5rem" }}
                    >
                        Delete
                    </button>
                </div>
            ))}

        </div>
    );
}
