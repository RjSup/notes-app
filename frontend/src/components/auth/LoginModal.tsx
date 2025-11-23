import FormStyles from '../ui/formlayout.module.css';
import {FormEvent, useEffect, useState} from "react";
import { login, LoginData, AuthResponse } from "../../api/authApi";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
import Button from "../ui/Button";

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

    return (
        <Modal open={open} onClose={onClose} title={"Login"}>
            <form onSubmit={handleSubmit} className={FormStyles.form}>
            {errorMsg && <p className={FormStyles.error}>{errorMsg}</p>}

                <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <div className={FormStyles.buttons}>
                <Button type="submit" disabled={loading}>
                        { loading ? "Logging in..." : "Login"}
                    </Button>
                    <Button variant="secondary" type="button" onClick={onClose} disabled={loading}>
                        Cancel
                    </Button>
                </div>
            </form>
        </Modal>
    );
}
