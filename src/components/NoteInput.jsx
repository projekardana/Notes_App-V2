import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FiCheck } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import parser from 'html-react-parser';

class NoteInput extends React.Component {
  constructor(props) {
    super(props);

    // Initial state
    this.state = {
      title: '',
      body: '',
    };

    this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
    this.onInputHandler = this.onInputHandler.bind(this);
    this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
  }

  onTitleChangeEventHandler(event) {
    this.setState(() => {
      return {
        title: event.target.value,
      };
    });
  }

  onInputHandler(event) {
    this.setState(() => {
      return {
        body: event.target.innerHTML,
      };
    });
  }

  onSubmitEventHandler(event) {
    event.preventDefault();
    this.props.addNote(this.state);
  }

  render() {
    return (
      <div className="app-container">
        <main>
          <section className="add-new-page">
            <div className="add-new-page__input">
              <input
                className="add-new-page__input__title"
                type="text"
                value={this.state.title}
                onChange={this.onTitleChangeEventHandler}
                placeholder="Catatan Rahasia"
              />
              <div
                className="add-new-page__input__body"
                contentEditable
                data-placeholder="Sebenarnya saya adalah ..."
                onInput={this.onInputHandler}
              />
              <div className="add-new-page__action">
                <button
                  className="action"
                  type="btn"
                  title="Simpan"
                  onClick={this.onSubmitEventHandler}
                >
                  <FiCheck />
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  }
}

NoteInput.propTypes = {
  addNote: PropTypes.func.isRequired,
};

export default NoteInput;
