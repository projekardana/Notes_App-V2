import React from "react";
import PropTypes from "prop-types";

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

    onInputHandler(event) {
        this.setState(() => {
            return {
                body: event.target.innerHTML,
            }
        });
    }
}

NoteInput.PropTypes = {
    addContact: PropTypes.func.isRequired,
}

export default NoteInput;