import styles from "./navbar.module.css";
import { useState } from "react";
import SignupModal from "../auth/SignupModal";
import LoginModal from "../auth/LoginModal";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import Button from "./Button";

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

            {/* Burger things - need to make toggle button */}
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
                    </>

                )}

                {/* user not auth must register*/}
                {!isAuthenticated && (
                    <>
                        <li>
                            <Button
                                type="button"
                                onClick={() => setLoginOpen(true)}
                            >
                                Login
                            </Button>
                        </li>
                        <li>
                            <Button
                                type="button"
                                onClick={() => setSignupOpen(true)}
                            >
                                Signup
                            </Button>
                        </li>
                    </>
                )}

                {/* user has auth want to leave*/}
                {isAuthenticated && (
                    <li>
                        <Button
                            type="button"
                            onClick={() => logout()}
                        >
                            Logout
                        </Button>
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
