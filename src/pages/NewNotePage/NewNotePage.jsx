import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import create from '../../utilities/notes-service';

export default function NewNotePage({ addNote }) {
const [newNote, setNewNote] = useState("");

function handleChange(event) {
  const note = {...newNote, [event.target.name]: event.target.value}
  setNewNote(note);
}
const navigate = useNavigate();

function handleAddNote(evt) {
  evt.preventDefault();
  create(newNote);
  navigate("/notes");
}


  return (
    <>
      <h1>Add Note</h1>
      <form onSubmit={handleAddNote}>
        <input
          name='note'
          onChange={handleChange}
          placeholder="New Note"
          required
          pattern=".{4,}"
        />
        <button type="submit">ADD NOTE</button>
      </form>
    </>
  );
}
