import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function NoteItem({ id, title, body, createdAt }) {
  return (
    <div className="note-item">
      <h3 className="note-item__title">
        <Link to={`/detail/${id}`}>{title}</Link>
        {/* <NoteItemBody createdAt={createdAt} body={body} /> */}
      </h3>
      <p className="note-item__createdAt">{createdAt}</p>
      <p className="note-item__body">{body}</p>
    </div>
  );
}

NoteItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
};

export default NoteItem;
