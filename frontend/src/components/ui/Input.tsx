import React from "react";
import styles from "./input.module.css";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export default function Input({label, error, ...props}: InputProps) {
    return (
        <div className={styles.inputWrapper}>
            {label && <label>{label}</label>}
            <input {...props} />
            {error && <p className={styles.inputError}>{error}</p>}
        </div>
    );
};