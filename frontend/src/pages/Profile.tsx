import styles from "./profile.module.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer"
import { useEffect, useState } from "react";
import {fetchMe, User} from "../api/userApi";

export default function Profile() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadUser = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("User is not logged in");
                setLoading(false);
                return;
            }

            try {
                const fetchedUser = await fetchMe(token);
                setUser(fetchedUser);
            } catch (err: any) {
                setError(err.message || "Failed to load user");
            } finally {
                setLoading(false);
            }
        };

        loadUser();
    }, []);



    if (loading) {
        return <div className={styles.landingContainer}>Loading user...</div>;
    }

    if (error) {
        return <div className={styles.landingContainer}>Error: {error}</div>;
    }

    return (
        <div className={styles.landingContainer}>
            <div className={styles.navContainer}>
                <Navbar />
            </div>


            <div className={styles.contentContainer}>
                <div className={styles.sidebarContent}>


                </div>
                <div className={styles.bodyContent}>
                    <h1>Hello, {user?.username}</h1>
                </div>
            </div>
            <Footer />
        </div>
    );
}
