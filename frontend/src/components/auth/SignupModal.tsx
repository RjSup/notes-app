import formStyles from "../ui/formlayout.module.css";
import {FormEvent, useEffect, useState} from "react";
import { signup, SignupData, AuthResponse } from "../../api/authApi";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
import Button from "../ui/Button";

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
        <Modal open={open} onClose={onClose} title="Signup">
            <form onSubmit={handleSubmit} className={formStyles.form}>

            <Input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

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

                {errorMsg && <p className="error">{errorMsg}</p>}

                <div className={formStyles.buttons}>
                <Button type="submit" disabled={loading}>
                        {loading ? "Signing up…" : "Signup"}
                    </Button>
                    <Button variant="secondary" type="button" onClick={onClose} disabled={loading}>
                        Cancel
                    </Button>
                </div>
            </form>
        </Modal>

    );


}
