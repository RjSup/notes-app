import NotesList from "../components/NotesList";
import React from "react";
import Navbar from "../components/Navbar";

export default function Notes() {
    return (
        <>
            <Navbar />
            <NotesList />
        </>
    );
};