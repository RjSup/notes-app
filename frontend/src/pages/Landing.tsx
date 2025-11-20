import Navbar from "../components/Navbar";
import styles from "./landing.module.css";
import {useState} from "react";
import SignupModal from "../components/SignupModal";
import { useNavigate } from "react-router-dom";
import {useAuth} from "../context/AuthContext";
import img from "../assets/img.png";

export default function Landing() {
    // state objects
    const [showSignup, setShowSignup] = useState(false);
    const  { login } = useAuth();
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
                    <div className={styles.leftcontainer}>
                        <h1>Notesly</h1>
                        <h2>This is notelsy</h2>
                        <p>Notesly is a web application to store you precious notes</p>

                        <button
                            className={styles.buttonComponent}
                            onClick={() => setShowSignup(true)}
                        >
                            Get Started
                        </button>
                    </div>

                    <div className={styles.rightContainer}>
                        <img
                            src={img}
                            alt="Notesly Preview"
                            className={styles.image}
                        />
                    </div>
                </div>
            </div>

            <SignupModal
                open={showSignup}
                onClose={() => setShowSignup(false)}
                onSignupSuccess={handleSignupSuccess}
            />

        </>
    );
}
