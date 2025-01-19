import React from "react";
import { archiveNote, deleteNote, getAllNotes } from "../utils/local-data";
import { showFormattedDate } from "../utils";
import { FiArchive, FiTrash } from "react-icons/fi";

class DetailPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            notes: getAllNotes(props.id),
        };

        this.onDeleteHandler = this.onDeleteHandler.bind(this);
        this.onArchivedHandler = this.onArchivedHandler.bind(this);
    }

    onDeleteHandler(id) {
        deleteNote(id);
        this.setState({ notes });
    }

    onArchivedHandler(id) {
        archiveNote(id);
        this.setState({ notes });
    }

    render() {
        return (
            <div className="detail-page">
                <h3 className="detail-page__title">{title}</h3>
                <p className="detail-page__createdAt">{showFormattedDate(createdAt)}</p>
                <p className="detail-page__body">{body}</p>
            </div>
            <div className="detail-page__action">
                <button
                    className="note-item___archive-button"
                    type="button"
                    title="Arsipkan"
                    onClick={this.onArchivedHandler}
                >
                    <FiArchive />
                </button>
                <button
                    className="note-item__delete-button"
                    type="button"
                    title="Hapus"
                    onClick={() => this.onDeleteHandler(id)}
                >
                    <FiTrash />
                </button>
            </div>
        );
    }
    
}

export default DetailPage;