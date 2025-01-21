import React from 'react';
import PropTypes from 'prop-types';
import { FiCheck } from 'react-icons/fi';
import { Link } from 'react-router-dom'; // Jangan lupa import Link jika diperlukan
import Navigation from './Navigation'; // Jika ada komponen Navigation yang digunakan

class NoteInput extends React.Component {
  constructor(props) {
    super(props);

    // Initial state
    this.state = {
      title: '',
      body: '',
    };

    this.onTitleChangeHandler = this.onTitleChangeHandler.bind(this);
    this.onBodyChangeHandler = this.onBodyChangeHandler.bind(this);
    this.onSubmitChangeHandler = this.onSubmitChangeHandler.bind(this);
  }

  onTitleChangeHandler(event) {
    this.setState({ title: event.target.value });
  }

  onBodyChangeHandler(event) {
    this.setState({ body: event.target.value });
  }

  onSubmitChangeHandler(event) {
    event.preventDefault();

    const { title, body } = this.state;

    this.props.addNote({
      id: Date.now(),
      title,
      body,
    });

    this.setState({ title: '', body: '' });
  }

  render() {
    const { title, body } = this.state;
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
                value={title}
                onChange={this.onTitleChangeHandler}
                placeholder="Catatan Rahasia"
              />
              <div
                className="add-new-page__input__body"
                contentEditable
                data-placeholder="Sebenarnya saya adalah ..."
                onInput={this.onBodyChangeHandler}
                dangerouslySetInnerHTML={{ __html: body }}
              />
              <div className="add-new-page__action">
                <button
                  className="action"
                  type="button"
                  title="Simpan"
                  onClick={this.onSubmitChangeHandler} // Pastikan untuk menambahkan fungsi onClick di sini
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
