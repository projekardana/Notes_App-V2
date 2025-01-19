import React from "react";
import { useNavigate } from "react-router-dom";
import AddNote from "../components/AddNote";
import { addNote } from "../utils/local-data";
import NoteInput from "../components/NoteInput";
import PropTypes from "prop-types";
import { FaPlus } from "react-icons/fa";

function AddPage() {
    
    const navigate = useNavigate();

    function onAddNoteHandler(note) {
        addNote(note)
    }

    return (
        <section>
            <button>
                <FaPlus />
            <NoteInput addNote={onAddNoteHandler} />
            </button>
        </section>
    )

}

export default AddPage;
