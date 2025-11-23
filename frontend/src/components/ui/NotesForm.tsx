import React, { useState, useEffect } from "react";
import { createNote, updateNote, Note } from "../../api/notesApi";
import styles from "./notesform.module.css";

type Props = {
    existingNote?: Note;
    onSuccess: () => void;
    onCancel?: () => void;
};

export default function NoteForm({ existingNote, onSuccess, onCancel }: Props) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        if (existingNote) {
            setTitle(existingNote.title);
            setContent(existingNote.content);
        }
    }, [existingNote]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const noteData = { title, content };

        if (existingNote && existingNote.id) {
            await updateNote(existingNote.id, noteData);
        } else {
            await createNote(noteData);
        }

        onSuccess();
    };

    return (
        <form className={styles.formContainer} onSubmit={handleSubmit}>
            <h2 className={styles.title}>
                {existingNote ? "Edit Note" : "Create Note"}
            </h2>

            <input
                className={styles.input}
                type="text"
                placeholder="Note title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />

            <textarea
                className={styles.textarea}
                placeholder="Write something..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
            />

            <button className={styles.submit} type="submit">
                {existingNote ? "Save Changes" : "Add Note"}
            </button>

            {onCancel && (
                <button
                    className={styles.cancel}
                    type="button"
                    onClick={onCancel}
                >
                    Cancel
                </button>
            )}
        </form>
    );
}
