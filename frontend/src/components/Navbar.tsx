import styles from "./navbar.module.css";
import { useState } from "react";
import SignupModal from "./SignupModal";
import LoginModal from "./LoginModal";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Navbar() {
    // states
    const [menuOpen, setMenuOpen] = useState(false);
    const [loginOpen, setLoginOpen] = useState(false);
    const [signupOpen, setSignupOpen] = useState(false);

    // check auth
    const { isAuthenticated, logout, login } = useAuth();
    const navigate = useNavigate();

    const handleAuthSuccess = (token: string) => {
        login(token);
        navigate("/notes");
    };

    return (
        <nav className={styles.nav} data-state={menuOpen ? "open" : "closed"}>
            <Link className={styles.navlogo} to="/">Notesly</Link>

            {/* Burger things*/}
            <button
                className={styles.navtoggle}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle Menu"
            >
                <div></div><div></div><div></div>
            </button>

            <ul className={styles.navlist}>
                {/* main links*/}
                <li className={styles.homebutton}>
                    <Link to="/">Home</Link>
                </li>

                {isAuthenticated && (
                    <>
                        <li className={styles.notesbutton}>
                            <Link to="/notes">Notes</Link>
                        </li>
                        <li className={styles.profilebutton}>
                            <Link to="/profile">Profile</Link>
                        </li>
                    </>

                )}

                {/* user not auth must register*/}
                {!isAuthenticated && (
                    <>
                        <li>
                            <button className={styles.loginbutton}
                                type="button"
                                onClick={() => setLoginOpen(true)}
                            >
                                Login
                            </button>
                        </li>
                        <li>
                            <button className={styles.signupbutton}
                                type="button"
                                onClick={() => setSignupOpen(true)}
                            >
                                Signup
                            </button>
                        </li>
                    </>
                )}

                {/* user has auth want to leave*/}
                {isAuthenticated && (
                    <li>
                        <button className={styles.logoutbutton}
                            type="button"
                            onClick={() => logout()}
                        >
                            Logout
                        </button>
                    </li>
                )}
            </ul>

            {/* whether to show the auth models */}
            <SignupModal
                open={signupOpen}
                onClose={() => setSignupOpen(false)}
                onSignupSuccess={handleAuthSuccess}
            />

            <LoginModal
                open={loginOpen}
                onClose={() => setLoginOpen(false)}
                onLoginSuccess={handleAuthSuccess}
            />
        </nav>
    );
}
