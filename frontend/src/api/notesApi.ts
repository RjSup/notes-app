export type Note = {
    id: number;
    title: string;
    content: string;
};

export type NotePayload = {
    title: string;
    content: string;
};

const BASE_URL = "http://localhost:8080/api/notes";

async function handleResponse<T>(res: Response): Promise<T> {
    if (!res.ok) {
        const message = await res.text();
        throw new Error(message || "Request failed");
    }
    return res.json();
}

export async function fetchNotes(): Promise<Note[]> {
    const res = await fetch(`${BASE_URL}`);
    return handleResponse<Note[]>(res);
}

// Should return a single note
export async function fetchNote(id: number): Promise<Note> {
    const res = await fetch(`${BASE_URL}/${id}`);
    return handleResponse<Note>(res);
}

// Create should return the created note
export async function createNote(note: NotePayload): Promise<Note> {
    const res = await fetch(`${BASE_URL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(note),
    });
    return handleResponse<Note>(res);
}

// Update should return the updated note
export async function updateNote(id: number, note: NotePayload): Promise<Note> {
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(note),
    });
    return handleResponse<Note>(res);
}

// Delete should return success or at least not fail silently
export async function deleteNote(id: number): Promise<{ message: string }> {
    const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
    return handleResponse<{ message: string }>(res);
}
