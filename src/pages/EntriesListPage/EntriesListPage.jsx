import React, { useState, useEffect } from "react";
import { getEntries } from "../../utilities/entries-api";
import { useNavigate } from "react-router-dom";
import create from "../../utilities/entries-service";

export default function EntriesListPage({ addEntry }) {
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState({
    List: "",
});

  useEffect(() => {
    fetchEntries();
  }, []);

  // Function to fetch entries from the server
  async function fetchEntries() {
    const data = await getEntries();
    setEntries(data);
  }

  
  function handleChange(event) {
    const { name, value } = event.target;
    setNewEntry((prevEntry) => ({
      ...prevEntry, 
        [name]: value,
    }));
  }

  const navigate = useNavigate();

  async function handleAddEntry(evt) {
    evt.preventDefault();
    try {
      const createdEntry = await create(newEntry);
      addEntry(createdEntry); // Use the 'addEntry' prop to update the entries
      setEntries([...entries, createdEntry]);
      navigate("/");
    } catch (error) {
      console.error("Failed to create a new entry:", error.message);
    }
  }


  return (
    <>
      <h1>Your Lists</h1>
      <form onSubmit={handleAddEntry}>
        <input
          name="List"
          value={newEntry.List}
          onChange={handleChange}
          placeholder="Suggestions: Movies, Restaurants, Activities"
          required
        />
        <button type="submit">+</button>
      </form>        
      {entries.map((entry) => (
          <div className='card-container' key={entry._id}>
          {entry.List}</div>
         ))}
    </>
  );
}
