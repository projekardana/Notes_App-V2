import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getActiveNotes,
  deleteNote,
  archiveNote,
  unarchiveNote,
  getNote,
} from '../utils/api.js';
import { showFormattedDate } from '../utils';
import { IoMdArchive } from 'react-icons/io';
import { MdUnarchive } from 'react-icons/md';
import { FiTrash2 } from 'react-icons/fi';
import PropTypes from 'prop-types';

// Komponen Wrapper untuk menggunakan useParams dan useNavigate
function DetailPageWrapper() {
  const { id } = useParams();
  const navigate = useNavigate();

  return <DetailPage id={id} navigate={navigate} />;
}

class DetailPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      note: null,
    };

    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onArchivedHandler = this.onArchivedHandler.bind(this);
    this.onUnarchivedHandler = this.onUnarchivedHandler.bind(this);
  }

  async componentDidMount() {
    const { id } = this.props;
    const { error, data } = await getNote(id);

    if (!error) {
      this.setState({ note: data });
    } else {
      console.error('Error fetching note:', error);
      this.setState({ note: null });
    }
  }

  async onDeleteHandler(id) {
    await deleteNote(id);
    this.props.navigate('/'); // Navigasi kembali ke halaman utama
  }

  async onArchivedHandler(id) {
    await archiveNote(id);
    this.props.navigate('/'); // Navigasi kembali ke halaman utama
  }

  async onUnarchivedHandler(id) {
    await unarchiveNote(id);
    this.props.navigate('/'); // Navigasi kembali ke halaman utama
  }

  render() {
    const { note } = this.state;

    if (!note) {
      return <p>Catatan Tidak Ditemukan!</p>;
    }

    const { title, body, createdAt, id, archived } = note;

    return (
      <div className="app-container">
        <div className="detail-page">
          <h3 className="detail-page__title">{title}</h3>
          <p className="detail-page__createdAt">
            {showFormattedDate(createdAt)}
          </p>
          <p className="detail-page__body">{body}</p>
          <div className="detail-page__action">
            {archived ? (
              <button
                className="action"
                type="button"
                title="Unarchive"
                onClick={() => this.onUnarchivedHandler(id)}
              >
                <MdUnarchive />
              </button>
            ) : (
              <button
                className="action"
                type="button"
                title="Archive"
                onClick={() => this.onArchivedHandler(id)}
              >
                <IoMdArchive />
              </button>
            )}
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
  id: PropTypes.string.isRequired,
  navigate: PropTypes.func.isRequired,
};

export default DetailPageWrapper;
