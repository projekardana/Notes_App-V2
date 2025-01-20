import React from "react";
import PropTypes from "prop-types";
import { addNote } from "../utils/local-data";
import AddNote from "./AddNote";
import { FaCheck } from "react-icons/fa";

function NoteInputWrapper({ AddNote, noteContent }) {
    const handleSubmit = (event) => {
        event.preventDefault();

        if (noteContent.trim() === "") {
            alert("Catatan Tidak Boleh kosong!");
            return;
        }
        AddNote({ title: noteContent, body: noteContent});
    };

    return (
        <form onSubmit={handleSubmit}>
            <button type="submit">
                <FaCheck />
            </button>
        </form>
    );
}

class NoteInput extends React.Component {
    constructor(props) {
        super(props);

        // inisial state
        this.state = {
            title: '',
            body: '', 
        };

        this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
        this.onBodyChangeEventHandler = this.onBodyChangeEventHandler.bind(this);
    }

    onTitleChangeEventHandler(event) {
        this.setState(() => {
            return {
                title: event.target.value,
            };
        });
    }

    onBodyChangeEventHandler(event) {
        this.setState(() => {
            return {
                body: event.target.value,
            };
        });
    }
}

NoteInputWrapper.propTypes = {
    addNote: PropTypes.func.isRequired,
    noteContent: PropTypes.string.isRequired,
};

export default NoteInputWrapper;