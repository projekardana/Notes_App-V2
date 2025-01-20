import React from "react";
import { useParams } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import NoteList from "../components/NoteList";
import SearchBar from "../components/SearchBar";
import { deleteNote, getAllNotes, getArchivedNotes } from "../utils/local-data";
import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";

function HomePageWrapper() {
    const [searchParams, setSearchParams] = useSearchParams();

    const keyword = searchParams.get("search") || "";

    function changeSearchParams(keyword) {
        setSearchParams({ keyword });
    }

    return <HomePage defaultKeyword={keyword} keywordChange={changeSearchParams} />
}

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            notes: getAllNotes(),
            keyword: props.defaultKeyword || '',
        }

        this.onkeywordChangeHandler = this.onkeywordChangeHandler.bind(this);
    }

    onDeleteHandler(id) {
        deleteNote(id);

    }

    onArchivedHandler(id) {
        getArchivedNotes(id);

        // update the notes state from data.js
        this.setState(() => {
            return {
                notes: getAllNotes(),
            }
        });
    }

    onkeywordChangeHandler(keyword) {
        this.setState(() => {
            return {
                keyword,
            }
        });

        this.props.keywordChange(keyword);
    }

    render() {
        const notes = this.state.notes.filter((note) => {
            return note.title && note.title.toLowerCase().includes(this.state.keyword.toLowerCase())
        });

        return (
            <section>
                <SearchBar keyword={this.state.keyword} keywordChange={this.onkeywordChangeHandler} />
                <div className="homepage__action">
                    <Link to="/add">
                    <button className="action" type="button" title="Tambah">
                        <FiPlus />
                    </button>
                    </Link>
                </div>
            </section>
        )
    }
}

export default HomePageWrapper;