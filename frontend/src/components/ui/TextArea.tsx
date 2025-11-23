import React from "react";
import styles from "./textarea.module.css";

interface InputProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
}

export default function Text({label, error, ...props}: InputProps) {
    return (
        <div className={styles.inputWrapper}>
            {label && <label>{label}</label>}
                <textarea className={styles.textarea} {...props}/>
            {error && <p className={styles.inputError}>{error}</p>}
        </div>
    );
};