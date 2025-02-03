import React from 'react';
import { useSearchParams } from 'react-router-dom';
import NoteList from '../components/NoteList';
import { getActiveNotes, getNote } from '../utils/api';
import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import SearchBar from '../components/SearchBar';
import PropTypes from 'prop-types';
import { LocaleConsumer } from '../context/LocaleContext';

function HomePageWrapper() {
  const [searchParams, setSearchParams] = useSearchParams();

  const keyword = searchParams.get('keyword') || '';

  function changeSearchParams(keyword) {
    setSearchParams({ keyword });
  }

  return (
    <HomePage defaultKeyword={keyword} keywordChange={changeSearchParams} />
  );
}

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: [],
      keyword: props.defaultKeyword || '',
    };

    this.onAddNoteHandler = this.onAddNoteHandler.bind(this);
    this.onSearchChangeHandler = this.onSearchChangeHandler.bind(this);
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

  onSearchChangeHandler(keyword) {
    this.setState(() => {
      return {
        keyword,
      };
    });

    this.props.keywordChange(keyword);
  }

  async componentDidMount() {
    const { data } = await getActiveNotes();

    this.setState(() => {
      return {
        notes: data,
      };
    });
  }

  render() {
    const filteredActiveNotes = this.state.notes.filter((note) =>
      note.title.toLowerCase().includes(this.state.keyword.toLowerCase())
    );
    return (
      <LocaleConsumer>
        {({ locale }) => {
          return (
            <div className="app-container">
              <main>
                <div className="search-bar">
                  <h2>{locale === 'id' ? 'Catatan Aktif' : 'Active Note'}</h2>
                  <SearchBar
                    type="text"
                    placeholder="Cari berdasarkan judul..."
                    keyword={this.state.keyword}
                    keywordChange={this.onSearchChangeHandler}
                  />
                </div>
                {filteredActiveNotes.length > 0 ? (
                  <NoteList
                    notes={filteredActiveNotes}
                    status={false}
                    onArchive={this.onArchivedHandler}
                    onDelete={this.onDeleteHandler}
                  />
                ) : (
                  <div className="notes-list-empty">
                    <p>Tidak ada Catatan Aktif yang ditemukan</p>
                  </div>
                )}
              </main>
              <div className="homepage__action">
                <Link to="/add">
                  <button className="action" type="btn" title="Tambah">
                    <FiPlus />
                  </button>
                </Link>
              </div>
            </div>
          );
        }}
      </LocaleConsumer>
    );
  }
}

HomePage.propTypes = {
  defaultKeyword: PropTypes.string.isRequired,
  keywordChange: PropTypes.func.isRequired,
};

export default HomePageWrapper;
