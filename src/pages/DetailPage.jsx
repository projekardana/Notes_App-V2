import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getNote, deleteNote, archiveNote } from '../utils/local-data';
import Navigation from '../components/Navigation';
import { Link } from 'react-router-dom';
import { showFormattedDate } from '../utils';
import { IoMdArchive } from 'react-icons/io';
import { FiTrash2 } from 'react-icons/fi';
import PropTypes from 'prop-types';

function DetailPageWrapper() {
  const { id } = useParams();
  const navigate = useNavigate();

  return <DetailPage id={id} navigate={navigate} />;
}

class DetailPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      note: getNote(props.id),
    };

    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onArchivedHandler = this.onArchivedHandler.bind(this);
  }

  onDeleteHandler(id) {
    deleteNote(id);

    this.props.navigate('/');
  }

  onArchivedHandler(id) {
    archiveNote(id);

    this.props.navigate('/');
  }

  render() {
    const { note } = this.state;

    if (!note) {
      return <p>404 Catatan Tidak Ditemukan!</p>;
    }

    const { title, body, createdAt, id } = note;

    return (
      <div className="app-container">
        <header className="notes-app__header">
          <h1>
            <Link to={'/'}>Aplikasi Catatan</Link>
          </h1>
          <Navigation />
        </header>
        <div className="detail-page">
          <h3 className="detail-page__title">{title}</h3>
          <p className="detail-page__createdAt">
            {showFormattedDate(createdAt)}
          </p>
          <p className="detail-page__body">{body}</p>
          <div className="detail-page__action">
            <button
              className="action"
              type="button"
              title="Arsipkan"
              onClick={() => this.onArchivedHandler(id)}
            >
              <IoMdArchive />
            </button>
            <button
              className="action"
              type="button"
              title="Hapus"
              onClick={() => this.onDeleteHandler(id)}
            >
              <FiTrash2 />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

DetailPage.propTypes = {
  deleteNote: PropTypes.func,
  archiveNote: PropTypes.func,
};

export default DetailPageWrapper;
