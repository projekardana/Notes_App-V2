import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FiCheck } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';

class NoteInput extends React.Component {
  constructor(props) {
    super(props);

    // Initial state
    this.state = {
      title: '',
      body: '',
    };

    this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
    this.onBodyChangeEventHandler = this.onBodyChangeEventHandler.bind(this);
    this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
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

  onSubmitEventHandler(event) {
    event.preventDefault();
    this.props.addNote(this.state);
  }

  render() {
    const { body } = this.props;
    return (
      <div className="app-container">
        <header className="notes-app__header">
          <h1>
            <Link to="/">Aplikasi Catatan</Link>
          </h1>
          <Navigation />
        </header>
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
                onInput={this.onBodyChangeEventHandler}
                dangerouslySetInnerHTML={{ __html: body }}
              />
              <div className="add-new-page__action">
                <button
                  className="action"
                  type="button"
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
