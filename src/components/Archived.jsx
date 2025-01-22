import React from 'react';
import PropTypes from 'prop-types';

function ArchivedButton({ id, onArchived }) {
  return (
    <button
      className="note-item__archive-button"
      onClick={() => onArchived(id)}
    >
      Arsipkan
    </button>
  );
}

ArchivedButton.PropTypes = {
  id: PropTypes.number.isRequired,
  onArchived: PropTypes.func.isRequired,
};

export default ArchivedButton;
