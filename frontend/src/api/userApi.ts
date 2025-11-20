export type User = {
    userId?: number;
    username: string;
    email: string;
    password: string;
};

export async function fetchUsers(): Promise<User[]> {
    const res = await fetch("http://localhost:8080/api/users");
    return res.json();
}

export async function fetchUser(id: number): Promise<User[]> {
    const res = await fetch(`http://localhost:8080/api/users/${id}`);
    return res.json();
}

export async function createUser(user: { username: string, email: string; password: string }): Promise<User[]> {
    const res = await fetch("http://localhost:8080/api/users", {
        method: "POST",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify(user),
    });

    return res.json();
}

export async function updateUser(id: number, user: User): Promise<User[]> {
    const res = await fetch(`http://localhost:8080/api/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify(user),
    });

    return res.json();
}

export async function deleteUser(id: number): Promise<void> {
    await fetch(`/api/users/${id}`, { method: "DELETE" });
}