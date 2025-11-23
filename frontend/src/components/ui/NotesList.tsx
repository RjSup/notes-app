import NotesForm from "./NotesForm";
import styles from "./notelist.module.css"
import {useNotes} from "../../hooks/useNote";
import React, {JSX, useState} from "react";
import Button from "./Button";

export default function NotesList(): JSX.Element {
    const {
        notes,
        editingNote,
        setEditingNote,
        loadNotes,
        removeNote,
    } = useNotes();

    const [loading, setLoading] = useState(false);
    const [editButtonId, setButtonId] = useState<number | null>(null);

    return (
        <div className={styles.main}>
            <h1 className={styles.h1}>My Notes</h1>

            {/* CREATE MODE */}
            {!editingNote && (
                <div className={styles.createSection}>
                    <NotesForm
                        onSuccess={() => {
                            setEditingNote(null);
                            setButtonId(null);
                            loadNotes();
                        }}
                    />
                </div>
            )}

            {/* EDIT MODE */}
            {editingNote && (
                <NotesForm
                    existingNote={editingNote}
                    onSuccess={() => {
                        setEditingNote(null);
                        setButtonId(null);
                        loadNotes();
                    }}
                    // stopped editing
                    onCancel={() => {
                        setEditingNote(null);
                        setButtonId(null);
                        setLoading(false);
                    }}
                />
            )}

            <hr />

            {/* LIST */}
            {notes.map((note) => (
                <div key={note.id} className={styles.noteCard}>
                    <h3 className={styles.noteTitle}>{note.title}</h3>
                    <p className={styles.noteContent}>{note.content}</p>

                    <Button variant="primary"
                            type="button"
                            disabled={loading}
                            onClick={() =>  {
                                setEditingNote(note);
                                setButtonId(note.id);
                            }}
                    >
                        {editButtonId === note.id ? "Editing..." : "Edit"}
                    </Button>

                    <Button
                            variant="secondary"
                            type="button"
                            onClick={() => removeNote(note.id)}
                            disabled={loading}>
                        Delete
                    </Button>

                </div>
            ))}

        </div>
    );
}
