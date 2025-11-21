import styles from "./login.module.css";
import {FormEvent, useEffect, useState} from "react";
import { login, LoginData, AuthResponse } from "../api/authApi";

interface LoginModalProps {
    open: boolean;
    onClose: () => void;
    onLoginSuccess: (token: string) => void;
}

export default function LoginModal({ open, onClose, onLoginSuccess }: LoginModalProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);

    // reset form every time modal opens
    useEffect(() => {
        if(open) {
            setEmail("");
            setPassword("");
            setLoading(false);
            setErrorMsg("");
        }
    }, [open]);

    // if not open dont use state
    if (!open) return null;

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg("");

        try {
            const userData: LoginData = { email, password };
            const response: AuthResponse = await login(userData);
            localStorage.setItem("token", response.token);

            onLoginSuccess(response.token);
            onClose();
        } catch (error) {
            setErrorMsg("Invalid email or password");
            console.error("Login error", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        if(!loading) onClose();
    };

    return (
        <div className={styles.modalOverlay} role="dialog" aria-modal="true">
            <div className={styles.modalContent}>
                <h2>Login</h2>
                <form onSubmit={handleSubmit} className={styles.modalForm}>

                    {errorMsg && (
                        <p className={styles.error}>{errorMsg}</p>
                    )}

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
                        <button
                            className={styles.login}
                            type="submit" disabled={loading}>
                            {loading ? "Logging in…" : "Login"}
                        </button>
                        <button
                            className={styles.cancel}
                            type="button"
                            onClick={handleCancel}
                            disabled={loading}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
