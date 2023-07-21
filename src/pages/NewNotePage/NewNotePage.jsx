import { useState } from 'react';

export default function NewNotePage({ addNote }) {
const [newNote, setNewNote] = useState("");

function handleAddNote(evt) {
  evt.preventDefault();
  addNote(newNote);
  setNewNote('');
}

  return (
    <>
      <h1>Add Note</h1>
      <form onSubmit={handleAddNote}>
        <input
          value={newNote}
          onChange={(evt) => setNewNote(evt.target.value)}
          placeholder="New Note"
          required
          pattern=".{4,}"
        />
        <button type="submit">ADD NOTE</button>
      </form>
  </>
  );
}