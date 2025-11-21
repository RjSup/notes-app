import styles from "./signupmodal.module.css";
import {FormEvent, useEffect, useState} from "react";
import { signup, SignupData, AuthResponse } from "../api/authApi";

interface SignupModalProps {
    open: boolean;
    onClose: () => void;
    onSignupSuccess: (token: string) => void;
}

export default function SignupModal({ open, onClose, onSignupSuccess }: SignupModalProps) {
    // states
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);

    // set everything back t obasic
    useEffect(() => {
        if(open) {
            setUsername("");
            setEmail("");
            setPassword("");
            setLoading(false);
            setErrorMsg("");
        }
    }, [open]);

    if (!open) return null;

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg("");

        try {
            // send signup data
            const userData: SignupData = { username, email, password };
            const response: AuthResponse = await signup(userData);
            localStorage.setItem("token", response.token);

            onSignupSuccess(response.token);
            onClose();
        } catch (error) {
            setErrorMsg("Invalid details input.");
            console.error("Signup error", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.modalOverlay} role="dialog" aria-modal="true">
            <div className={styles.modalContent}>
                <h2 className={styles.title}>Signup</h2>

                <form onSubmit={handleSubmit} className={styles.modalForm}>
                    {/*show errors*/}
                    {errorMsg && <p className={styles.error}>{errorMsg}</p>}

                    <input
                        className={styles.username}
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        disabled={loading}
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={loading}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={loading}
                    />

                    {/* sumbit btns */}
                    <div className={styles.modalButtons}>
                        <button
                            className={styles.submitbutton}
                            type="submit" disabled={loading}>
                            {loading ? "Signing up…" : "Signup"}
                        </button>
                        <button
                            className={styles.cancelbutton}
                            type="button" onClick={onClose} disabled={loading}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );


}
