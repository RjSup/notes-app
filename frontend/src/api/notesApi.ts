export type Note = {
    id?: number;
    title: string;
    content: string;
}

export async function fetchNotes(): Promise<Note[]> {
    const res = await fetch("/api/notes");
    return res.json();
}

export async function fetchNote(id: number): Promise<Note[]> {
    const res = await fetch(`/api/notes/${id}`);
    return res.json();
}

export async function createNote(note: Note): Promise<Note[]> {
    const res = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify(note),
    });

    return res.json();
}

export async function updateNote(id: number, note: Note): Promise<Note[]> {
    const res = await fetch(`/api/notes/${id}`, {
        method: "PUT",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify(note),
    });

    return res.json();
}

export async function deleteNote(id: number): Promise<void> {
    await fetch(`/api/notes/${id}`, { method: "DELETE" });
}