export async function authFetch(url: string, options: RequestInit = {}) {
    const token = localStorage.getItem("authToken");

    const headers = {
        ...options.headers,
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "application/json",
    };

    return fetch(url, { ...options, headers });
}
