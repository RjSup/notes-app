export type User = {
    userId: number;
    username: string;
    email: string;
    password?: string;
};

const BASE_URL = "http://localhost:8080/api/users";

async function handleResponse<T>(res: Response): Promise<T> {
    if (!res.ok) {
        const message = await res.text();
        throw new Error(message || "Request failed");
    }
    return res.json();
}

export async function fetchUsers(): Promise<User[]> {
    const res = await fetch(`${BASE_URL}`);
    return handleResponse<User[]>(res);
}

// Should return a single user, not an array
export async function fetchUser(id: number): Promise<User> {
    const res = await fetch(`${BASE_URL}/${id}`);
    return handleResponse<User>(res);
}

// Should return the created user
export async function createUser(user: Omit<User, "userId">): Promise<User> {
    const res = await fetch(`${BASE_URL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
    });
    return handleResponse<User>(res);
}

// Should return the updated user
export async function updateUser(id: number, user: Partial<User>): Promise<User> {
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
    });
    return handleResponse<User>(res);
}

export async function deleteUser(id: number): Promise<{ message: string }> {
    const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
    return handleResponse<{ message: string }>(res);
}

export async function fetchMe(token: string | null): Promise<User> {
    if (!token) throw new Error("No token found");

    const res = await fetch(`http://localhost:8080/api/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
        const message = await res.text();
        throw new Error(message || "Failed to fetch user");
    }
    return res.json();
}

