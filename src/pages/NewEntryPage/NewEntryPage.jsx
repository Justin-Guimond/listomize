import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import create from '../../utilities/entries-service';

export default function NewEntryPage({ addEntry }) {
const [newEntry, setNewEntry] = useState("");

function handleChange(event) {
  const entry = {...newEntry, [event.target.name]: event.target.value}
  setNewEntry(entry);
}
const navigate = useNavigate();

function handleAddEntry(evt) {
  evt.preventDefault();
  create(newEntry);
  navigate("/entries");
}


  return (
    <>
      <h1>Add AI Model</h1>
      <form onSubmit={handleAddEntry}>
        <input
          name='entry'
          onChange={handleChange}
          placeholder="New AI Model"
          required
          pattern=".{4,}"
        />
        <button type="submit">ADD AI Model</button>
      </form>
    </>
  );
}
