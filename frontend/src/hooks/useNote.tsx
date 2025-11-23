// hook for notes operations
import { useEffect, useState} from "react";
import { fetchNotes, deleteNote, Note } from "../api/notesApi";

export function useNotes() {
    // note states
    const [notes, setNotes] = useState<Note[]>([]);
    const [editingNote, setEditingNote] = useState<Note | null>(null);

    const loadNotes = () => {
        fetchNotes().then(setNotes);
    };

    const removeNote = async (id: number) => {
        await deleteNote(id);
        loadNotes();
    };

    useEffect(() => {
        loadNotes();
    }, []);

    return {
        notes,
        editingNote,
        setEditingNote,
        loadNotes,
        removeNote,
    };
}
