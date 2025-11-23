import styles from "./button.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary";
}

export default function Button({ variant = "primary", className = "", ...props }: ButtonProps) {
    return (
        <button
            className={`${styles.button} ${variant === "secondary" ? styles.secondary : ""} ${className}`}
            {...props}
        />
    );
}
