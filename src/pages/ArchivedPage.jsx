import React from 'react';
import { useSearchParams } from 'react-router-dom';
import Navigation from '../components/Navigation';
import NoteList from '../components/NoteList';
import {
  archiveNote,
  deleteNote,
  getArchivedNotes,
  unarchiveNote,
} from '../utils/api';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import SearchBar from '../components/SearchBar';
import { LocaleConsumer } from '../context/LocaleContext';

function ArchivedPageWrapper() {
  const [searchParams, setSearchParams] = useSearchParams();

  const keyword = searchParams.get('keyword') || '';

  function changeSearchParams(keyword) {
    setSearchParams({ keyword });
  }

  return (
    <ArchivedPage defaultKeyword={keyword} keywordChange={changeSearchParams} />
  );
}

class ArchivedPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: [],
      keyword: props.defaultKeyword || '',
      initializing: true,
    };

    this.onSearchChangeHandler = this.onSearchChangeHandler.bind(this);
    this.onArchivedHandler = this.onArchivedHandler.bind(this);
    this.onDeleteHandler = this.onDeleteHandler.bind(this);
  }

  async componentDidMount() {
    const { error, data } = await getArchivedNotes();
    if (!error) {
      this.setState({ notes: data, initializing: false });
    }
  }

  onSearchChangeHandler(keyword) {
    this.setState(() => {
      return {
        keyword,
      };
    });

    this.props.keywordChange(keyword);
  }

  async onUnarchivedHandler(id) {
    await unarchiveNote(id);

    const { data } = await getArchivedNotes();
    this.setState({ notes: data });
  }

  async onArchivedHandler(id) {
    await archiveNote(id);

    const { error, data } = await getArchivedNotes();
    if (!error) {
      this.setState({ notes: data });
    }
  }

  async onDeleteHandler(id) {
    await deleteNote(id);

    const { error, data } = await getArchivedNotes();
    if (!error) {
      this.setState({ notes: data });
    }
  }

  render() {
    if (this.state.initializing) {
      return (
        <div className="app-container">
          <p>Memuat Catatan... </p>
        </div>
      );
    }
    const filteredArchiveNotes = this.state.notes.filter(
      (note) =>
        note.archived === true &&
        note.title.toLowerCase().includes(this.state.keyword.toLowerCase())
    );

    return (
      <LocaleConsumer>
        {({ locale }) => {
          return (
            <div className="app-container">
              <main>
                <div className="search-bar">
                  <h2>{locale === 'id' ? 'Catatan Arsip' : 'Arsive Note'}</h2>
                  <SearchBar
                    type="text"
                    placeholder="Cari berdasarkan judul..."
                    keyword={this.state.keyword}
                    keywordChange={this.onSearchChangeHandler}
                  />
                </div>
                {filteredArchiveNotes.length > 0 ? (
                  <NoteList
                    notes={filteredArchiveNotes}
                    status={true}
                    onArchive={this.onArchivedHandler}
                    onDelete={this.onDeleteHandler}
                  />
                ) : (
                  <div className="notes-list-empty">
                    <p>
                      {locale === 'id'
                        ? 'Tidak ada Catatan yang ditemukan'
                        : 'No Other Notes'}
                    </p>
                  </div>
                )}
              </main>
            </div>
          );
        }}
      </LocaleConsumer>
    );
  }
}

ArchivedPage.propTypes = {
  defaultKeyword: PropTypes.string.isRequired,
  keywordChange: PropTypes.func.isRequired,
};

export default ArchivedPageWrapper;
