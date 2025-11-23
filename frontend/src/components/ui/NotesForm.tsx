import useNoteForm from "../../hooks/useNoteForm";
import { createNote, updateNote, Note } from "../../api/notesApi";
import styles from "./notesform.module.css";
import React from "react";
import Button from "./Button";
import Input from "./Input";
import TextArea from "./TextArea";

type Props = {
    existingNote?: Note;
    onSuccess: () => void;
    onCancel?: () => void;
};

export default function NotesForm({ existingNote, onSuccess, onCancel }: Props) {
    // state data from usenoteform
    const { title, setTitle, content, setContent } = useNoteForm(existingNote);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (existingNote?.id) {
            await updateNote(existingNote.id, { title, content });
        } else {
            await createNote({ title, content });
        }

        // reset fields
        setTitle("");
        setContent("");

        onSuccess();
    };

    return (
        <form className={styles.formContainer} onSubmit={handleSubmit}>
            <h2 className={styles.title}>
                {existingNote ? "Edit Note" : "Create Note"}
            </h2>

            <Input
                type="text"
                placeholder="Set title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            >

            </Input>

            <TextArea
                placeholder="Write something..."
                value={content}
                rows={10}
                cols={50}
                onChange={(e) => setContent(e.target.value)}
                required
            >
            </TextArea>

            <Button variant="primary" type="submit" onClick={handleSubmit}>
                {existingNote ? "Save Changes" : "Add Note"}
            </Button>

            {onCancel && (

                <Button
                    variant="primary"
                    type="button"
                    onClick={onCancel}
                >
                    Cancel
                </Button>
            )}
        </form>
    );
}
