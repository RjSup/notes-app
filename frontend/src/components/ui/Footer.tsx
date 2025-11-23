import styles from "./footer.module.css";

export default function Footer() {
    const year: number = new Date().getFullYear();


    return (
        <footer className={styles.footer}>
            &copy; {year} Notesly.
        </footer>
    )
}