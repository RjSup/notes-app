import styles from "./signupmodal.module.css";
import { FormEvent, useState } from "react";
import { login, LoginData, AuthResponse } from "../api/authApi";

interface LoginModalProps {
    open: boolean;
    onClose: () => void;
    onLoginSuccess: (token: string) => void;
}

export default function LoginModal({ open, onClose, onLoginSuccess }: LoginModalProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    if (!open) return null;

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const userData: LoginData = { email, password };
            const response: AuthResponse = await login(userData);
            onLoginSuccess(response.token);
            console.log("Login successful:", response.token);
            onClose();
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2>Login</h2>
                <form onSubmit={handleSubmit} className={styles.modalForm}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <div className={styles.modalButtons}>
                        <button type="submit">Login</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
