import { useState } from "react";
import { useNavigate } from "react-router-dom";
import create from "../../utilities/entries-service";

export default function NewEntryPage({ addEntry }) {
  const [newEntry, setNewEntry] = useState({
    details: {
      AIModel: "",
      DevelopedBy: "",
      ReleasedDate: "",
      Pros: "",
      Cons: "",
      entry: "",
      tryURL: "",
      imgURL: "",
    },
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
      navigate("/entries");
    } catch (error) {
      console.error("Failed to create a new entry:", error.message);
    }
  }

  return (
    <>
      <h1>Add AI App</h1>
      <form onSubmit={handleAddEntry}>
        <input
          name="AIModel"
          value={newEntry.details.AIModel}
          onChange={handleChange}
          placeholder="AI App"
          required
        />
        <input
          name="DevelopedBy"
          value={newEntry.details.DevelopedBy}
          onChange={handleChange}
          placeholder="Developed By"
          required
        />
        <input
          name="ReleasedDate"
          value={newEntry.details.ReleasedDate}
          onChange={handleChange}
          type="date"
          required
        />
        <input
          name="Pros"
          value={newEntry.details.Pros}
          onChange={handleChange}
          placeholder="Pros"
          required
        />
        <input
          name="Cons"
          value={newEntry.details.Cons}
          onChange={handleChange}
          placeholder="Cons"
          required
        />
        <input
          type="url"
          name="imgURL"
          value={newEntry.details.imgURL}
          onChange={handleChange}
          placeholder="Image URL"
        />
        <input
          type="url"
          name="tryURL"
          value={newEntry.details.tryURL}
          onChange={handleChange}
          placeholder="URL to AI App"
        />
        <textarea
          name="entry"
          value={newEntry.details.entry}
          onChange={handleChange}
          placeholder="Description"
          required
        />

        <button type="submit">Add AI App</button>
      </form>
    </>
  );
}
