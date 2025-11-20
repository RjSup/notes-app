import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const stored = localStorage.getItem("authToken");
        if (stored) setToken(stored);
        setLoading(false)
    }, []);

    const login = (token: string) => {
        setToken(token);
        localStorage.setItem("authToken", token);
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem("authToken");
    };

    return (
        <AuthContext.Provider value={{ token, login, logout, isAuthenticated: !!token, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be inside AuthProvider");
    return ctx;
}
