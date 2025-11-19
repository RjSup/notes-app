export type User = {
    userId?: number;
    username: string;
    email: string;
    password: string;
};

export async function fetchUsers(): Promise<User[]> {
    const res = await fetch("/api/users");
    return res.json();
}

export async function fetchUser(id: number): Promise<User[]> {
    const res = await fetch(`/api/user/${id}`);
    return res.json();
}

export async function createUser(user: User): Promise<User[]> {
    const res = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify(user),
    });

    return res.json();
}

export async function updateUser(id: number, user: User): Promise<User[]> {
    const res = await fetch(`/api/user/${id}`, {
        method: "PUT",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify(user),
    });

    return res.json();
}

export async function deleteUser(id: number): Promise<void> {
    await fetch(`/api/user/${id}`, { method: "DELETE" });
}