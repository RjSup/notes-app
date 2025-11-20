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

// base URL
const BASE_URL = "http://localhost:8080/api/auth";

async function handleResponse<T>(res: Response): Promise<T> {
    if (!res.ok) {
        const message = await res.text();
        throw new Error(message || "Request failed");
    }
    return res.json();
}

export async function signup(data: SignupData): Promise<AuthResponse> {
    const res = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return handleResponse<AuthResponse>(res);
}

export async function login(data: LoginData): Promise<AuthResponse> {
    const res = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return handleResponse<AuthResponse>(res);
}

