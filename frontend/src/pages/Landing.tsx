import Navbar from "../components/ui/Navbar";
import styles from "./landing.module.css";
import {useState} from "react";
import SignupModal from "../components/auth/SignupModal";
import { useNavigate } from "react-router-dom";
import Footer from "../components/ui/Footer"
import {useAuth} from "../context/AuthContext";
import img from "../assets/Untitled.png";
import Button from "../components/ui/Button";

export default function Landing() {
    // state objects
    const [showSignup, setShowSignup] = useState(false);
    const { isAuthenticated, login } = useAuth();
    const navigate = useNavigate();

    function handleSignupSuccess(token: string) {
        login(token);
        navigate("/notes");
        setShowSignup(true);
    }

    return (
        <>
            <div className={styles.landingContainer}>
                <div className={styles.navContainer}>
                    <Navbar />
                </div>
                <div className={styles.contentContainer}>
                    <div className={styles.leftContainer}>
                        <div className={styles.leftContent}>
                            <h1 className={styles.title}>Notesly</h1>
                            <h2>This is notelsy</h2>
                            <p>Notesly is a web application to store you precious notes</p>

                            {!isAuthenticated && (
                                <Button
                                    onClick={() => setShowSignup(true)}
                                >
                                    Get Started
                                </Button>
                            )}
                        </div>
                    </div>

                    <div className={styles.rightContainer}>
                        <div className={styles.rightContent}>
                            <img
                                src={img}
                                alt="Notesly Preview"
                                className={styles.image}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <SignupModal
                open={showSignup}
                onClose={() => setShowSignup(false)}
                onSignupSuccess={handleSignupSuccess}
            />
                <Footer />
        </>
    );
}
