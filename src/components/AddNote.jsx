import React from "react";
import PropTypes from "prop-types";

class AddNote extends React.Component {
    constructor(props) {
        super(props);

        // inisial state
        this.state = {
            title: '',
            body: '',
        }

        this.onTitleChangeHandler = this.onTitleChangeHandler.bind(this);
        this.onBodyChangeHandler = this.onBodyChangeHandler.bind(this);
        this.onSubmitChangeHandler = this.onSubmitChangeHandler.bind(this);
    }

    onTitleChangeHandler(event) {
        this.setState(() => {
            return {
                title: event.target.value,
            }
        });
    }

    onBodyChangeHandler(event) {
        this.setState(() => {
            return {
                body: event.target.value,
            }
        });
    }

    onSubmitChangeHandler(event) {
        event.preventDefault();
        this.props.AddNote(this.state)
    }

    render() {
        return (
            <main className="add-new-page__input__title">
            <input 
                type="text" 
                value={title} 
                onChange={onTitleChangeHandler} 
                placeholder="Catatan Rahasia"
            />
            <div 
                className="add-new-page__body__body"
                placeholder="Sebenarnya saya adalah ..." 
                contentEditable
                onInput={onInputHandler}
                dangerouslySetInnerHTML={{ __html: body }} 
            />
            </main>
        )
    }
}

export default AddNote;