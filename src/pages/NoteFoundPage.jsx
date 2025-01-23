import React from 'react';
import { Link } from 'react-router-dom';

function NoteFoundPage() {
  return (
    <div className="app-container">
      <div className="note-found-page">
        <h1>NOT FOUND PAGE 404</h1>
        <p>Halaman yang Anda Cari Tidak Di Temukan.</p>
        <p>
          Kembali ke <Link to="/">HomePage</Link>
        </p>
      </div>
    </div>
  );
}

export default NoteFoundPage;
