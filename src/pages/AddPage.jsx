import React from "react";
import { useNavigate } from "react-router-dom";
import AddNote from "../components/AddNote";
import { addNote } from "../utils/local-data";
import NoteInput from "../components/NoteInput";
import { FaPlus } from "react-icons/fa";

function AddPage() {
    
    const navigate = useNavigate();

    function onAddNoteHandler({ title, body }) {
        addNote(title, body)
    }

    return (
        <section>
            <button>
                <FaPlus />
            <NoteInput AddNote={onAddNoteHandler} />
            </button>
        </section>
    )

}

export default AddPage;
