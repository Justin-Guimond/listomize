import { useState } from "react";
import { useNavigate } from "react-router-dom";
import create from "../../utilities/entries-service";

export default function NewEntryPage({ addEntry }) {
  const [newEntry, setNewEntry] = useState({
      List: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setNewEntry((prevEntry) => ({
      ...prevEntry,
      details: {
        ...prevEntry.details,
        [name]: value,
      },
    }));
  }

  const navigate = useNavigate();

  async function handleAddEntry(evt) {
    evt.preventDefault();
    try {
      const createdEntry = await create(newEntry);
      addEntry(createdEntry); // Use the 'addEntry' prop to update the entries
      // navigate("/entries");
    } catch (error) {
      console.error("Failed to create a new entry:", error.message);
    }
  }

  return (
    <>
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
    </>
  );
}
