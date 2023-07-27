import React, { useState, useEffect } from 'react';
import { getEntries, createEntry, deleteEntry, updateEntry } from '../../utilities/entries-api';

function YourComponent() {
  // State to store the list of entries and the data for creating a new entry
  const [entries, setEntries] = useState([]);
  const [newEntryData, setNewEntryData] = useState({ title: '', description: '' });

  // Fetch entries when the component mounts
  useEffect(() => {
    fetchEntries();
  }, []);

  // Function to fetch entries from the server
  async function fetchEntries() {
    const data = await getEntries();
    setEntries(data);
  }

  // Function to create a new entry
  async function handleCreateEntry() {
    await createEntry(newEntryData);
    // Refresh the entries after creating a new entry
    fetchEntries();
  }

  // Function to delete an entry
  async function handleDeleteEntry(id) {
    await deleteEntry(id);
    // Refresh the entries after deleting an entry
    fetchEntries();
  }
//i added console logs to see what is the issue to start debigging ******
  async function handleUpdateEntry(id, updatedData) {
    console.log('handleUpdateEntry called with id:', id);
    console.log('updatedData:', updatedData);
    await updateEntry(id, updatedData);
    // Refresh the entries after updating an entry
    fetchEntries();
  }
  //i added console logs to see what is the issue to start debigging********
  

  return (
    <div>
      {/* Display the list of entries */}
      {entries.map((entry) => (
        <div key={entry._id}>
          <p>{entry.title}</p>
          <p>{entry.description}</p>
          
          {/* Display the AI model details from n.details */}
          <p>{entry.details.AIModel}</p>
          <p>{entry.details.DevelopedBy}</p>
          <p>{entry.details.ReleasedDate}</p>
          <p>{entry.details.Pros}</p>
          <p>{entry.details.Cons}</p>
          <p>{entry.details.entry}</p>
          <p>{entry.details.user}</p>

          <button onClick={() => handleDeleteEntry(entry._id)}>Delete</button>
          <button onClick={() => handleUpdateEntry(entry._id, { title: 'Updated Title', description: 'Updated Description' })}>Update</button>
        </div>
      ))}
      {/* Input fields to create a new entry */}
      <input
        type="text"
        placeholder="Title"
        value={newEntryData.title}
        onChange={(e) => setNewEntryData({ ...newEntryData, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="Description"
        value={newEntryData.description}
        onChange={(e) => setNewEntryData({ ...newEntryData, description: e.target.value })}
      />
      <button onClick={handleCreateEntry}>Create Entry</button>
    </div>
  );
}

export default YourComponent;
