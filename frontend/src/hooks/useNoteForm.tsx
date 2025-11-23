import { useState, useEffect } from "react";
import { Note } from "../api/notesApi";

export default function useNoteForm(existingNote?: Note) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        if (existingNote) {
            setTitle(existingNote.title);
            setContent(existingNote.content);
        }
    }, [existingNote]);

    return { title, setTitle, content, setContent };
}