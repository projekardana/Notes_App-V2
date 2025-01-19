import React from "react";
import NoteItemBody from "./NoteItemBody";
import DeleteButton from "./DeleteButton";
import Archived from "./Archived";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";


function NoteItem ({ id, title, createdAt, body, onDelete, onArchived}) {
    return (
        <div className="note-item">
            <h3 className="noteitem__title">
            <Link to={`/detail/${id}`}>{title}</Link>
            <NoteItemBody createdAt={createdAt} body={body} />
            </h3>
        </div>
    );
}

NoteItem.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    createdAt: PropTypes.bool.isRequired,
    body: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
    onArchived: PropTypes.func.isRequired,
}

export default NoteItem;