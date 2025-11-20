export type AuthResponse = {
    token: string;
};

export type SignupData = {
    username: string;
    email: string;
    password: string;
};

export type LoginData = {
    email: string;
    password: string;
};

export async function signup(user: SignupData): Promise<AuthResponse> {
    const res = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
    });

    if (!res.ok) throw new Error(await res.text());

    return await res.json();
}

export async function login(user: LoginData): Promise<AuthResponse> {
    const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
    });

    if (!res.ok) throw new Error(await res.text());

    return await res.json();
}

