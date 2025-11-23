import React from "react";
import styles from "./modal.module.css";

interface ModalProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
}

export default function Modal({ open, onClose, title, children }: ModalProps) {
    if (!open) return null;

    return (
        <div className={styles.modalOverlay} role="dialog" aria-modal="true" onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                {title && <h2>{title}</h2>}
                {children}
            </div>
        </div>
    );
}
