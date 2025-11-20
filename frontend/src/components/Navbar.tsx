import styles from "./navbar.module.css";
import { useState } from "react";
import SignupModal from "./SignupModal";
import LoginModal from "./LoginModal";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [loginOpen, setLoginOpen] = useState(false);
    const [signupOpen, setSignupOpen] = useState(false);

    const { isAuthenticated, logout, login } = useAuth();
    const navigate = useNavigate();

    const handleSignupSuccess = (token: string) => {
        login(token);
        navigate("/notes");
    };

    const handleLoginSuccess = (token: string) => {
        login(token);
        navigate("/notes");
    };

    return (
        <nav className={styles.nav} nav-state={open ? "open" : "closed"}>
            <a className={styles.navlogo} href="/">RJ</a>

            <button
                className={styles.navtoggle}
                onClick={() => setOpen(!open)}
                aria-label="Toggle Menu"
            >
                <div></div><div></div><div></div>
            </button>

            <ul className={styles.navlist}>
                <li><a href="/">Home</a></li>

                {isAuthenticated && <li><a href="/notes">Dashboard</a></li>}

                {!isAuthenticated && (
                    <>
                        <li><a href="#" onClick={(e) => { e.preventDefault(); setLoginOpen(true); }}>Login</a></li>
                        <li><a href="#" onClick={(e) => { e.preventDefault(); setSignupOpen(true); }}>Signup</a></li>
                    </>
                )}

                {isAuthenticated && (
                    <li>
                        <a href="#" onClick={(e) => { e.preventDefault(); logout(); }}>
                            Logout
                        </a>
                    </li>
                )}
            </ul>

            <SignupModal
                open={signupOpen}
                onClose={() => setSignupOpen(false)}
                onSignupSuccess={handleSignupSuccess}
            />

            <LoginModal
                open={loginOpen}
                onClose={() => setLoginOpen(false)}
                onLoginSuccess={handleLoginSuccess}
            />
        </nav>
    );
}
