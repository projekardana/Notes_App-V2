import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi'; // pastikan FiPlus sudah diimpor

class AddNote extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: getAllNotes(),
      searchQuery: '',
    };

    this.onAddNoteHandler = this.onAddNoteHandler.bind(this);
  }

  onAddNoteHandler({ title, body }) {
    this.setState((prevState) => {
      return {
        notes: [
          ...prevState.notes,
          {
            id: +new Date(),
            title,
            body,
            createdAt: new Date().toISOString(),
            archived: false,
          },
        ],
      };
    });
  }

  render() {
    return (
      <div className="homepage__action">
        <Link to="/add">
          <button className="action" type="button" title="Tambah">
            <FiPlus />
          </button>
        </Link>
      </div>
    );
  }
}

AddNote.PropTypes = {
  onAddNoteHandler: PropTypes.func.isRequired,
};

export default AddNote;
