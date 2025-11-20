import styles from "./signupmodal.module.css";
import { FormEvent, useState } from "react";
import { signup, SignupData, AuthResponse } from "../api/authApi";

interface SignupModalProps {
    open: boolean;
    onClose: () => void;
    onSignupSuccess: (token: string) => void;
}

export default function SignupModal({ open, onClose, onSignupSuccess }: SignupModalProps) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    if (!open) return null;

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const userData: SignupData = { username, email, password };
            const response: AuthResponse = await signup(userData);
            onSignupSuccess(response.token);
            console.log("Signup successful:", response.token);
            onClose();
        } catch (error) {
            console.error("Signup error:", error);
        }
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2>Signup</h2>
                <form onSubmit={handleSubmit} className={styles.modalForm}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
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
                        <button type="submit">Signup</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );


}
