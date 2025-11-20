import React, {useState, useEffect, ChangeEvent} from "react";
import { createNote, updateNote, Note } from "../api/notesApi";

type Props = {
    existingNote?: Note;               // for edit mode
    onSuccess: () => void;             // refresh list after save
    onCancel?: () => void;             // optional cancel button
};

export default function NoteForm({ existingNote, onSuccess, onCancel }: Props) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    // If editing: pre-fill fields
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
        <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
            <h2>{existingNote ? "Edit Note" : "Create Note"}</h2>

            <div>
                <input
                    type="text"
                    placeholder="Note title"
                    value={title}
                    onChange={(e):void => setTitle(e.target.value)}
                    required
                    style={{ width: "100%", marginBottom: "0.5rem" }}
                />
            </div>

            <div>
        <textarea
            placeholder="Write something..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            style={{ width: "100%", height: "120px" }}
        />
            </div>

            <button type="submit">
                {existingNote ? "Save Changes" : "Add Note"}
            </button>

            {onCancel && (
                <button type="button" onClick={onCancel} style={{ marginLeft: "1rem" }}>
                    Cancel
                </button>
            )}
        </form>
    );
}
