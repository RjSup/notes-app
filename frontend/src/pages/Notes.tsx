import NotesList from "../components/ui/NotesList";
import React from "react";
import Navbar from "../components/ui/Navbar";
import Footer from "../components/ui/Navbar";

export default function Notes() {
    return (
        <>
            <Navbar />
            <NotesList />
            <Footer />
        </>
    );
};