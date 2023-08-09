import React, { useState, useEffect } from "react";
import { getEntries, search, deleteEntry, updateEntry, createEntry } from "../../utilities/entries-api";
import EditEntryForm from "../../components/EditEntryForm/EditEntryForm";
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";

export default function EntriesListPage({ addEntry }) {
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState({item:"", list:""});
  const [showModal, setShowModal] = useState(false);
  const [randomItem, setRandomItem] = useState(null);
  // const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  // Function to fetch entries from the server
  async function fetchEntries(value) {
    if (value) {
      const data = await search(value);
      setEntries(data);
    }
  }
  
  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const getRandomItem = () => {
    const randomIndex = Math.floor(Math.random() * entries.length);
    const selectedItem = entries[randomIndex];
    setRandomItem(selectedItem);
  };

  function handleChange(event) {
    const { name, value } = event.target;
    setNewEntry({...newEntry, [name]: value,
    });
  }

  function handleSelectChange(event) {
    const { name, value } = event.target;
    setNewEntry({...newEntry, [name]: value,
    });
    fetchEntries(value);
    console.log(newEntry);
  }

  async function handleAddEntry(evt) {
    evt.preventDefault();
    try {
      const createdEntry = await createEntry(newEntry);
      addEntry(createdEntry); // Use the 'addEntry' prop to update the entries
      setEntries([...entries, createdEntry]);
    } catch (error) {
      console.error("Failed to create a new entry:", error.message);
    }
  }

  // async function handleUpdateEntry(updatedData) {
  //   try {
  //     await updateEntry(item1._id, updatedData);
  //     // Refresh the entry details after updating
  //     fetchEntries();
  //     setIsEditing(false); // After update, set isEditing to false to display details again
  //   } catch (error) {
  //     console.error('Error updating entry:', error);
  //   }
  // }

  async function handleDeleteEntry(id) {
    try {
      await deleteEntry(id);
      setEntries(entries.filter(entry => entry._id !== id));
    } catch (error) {
      console.error('Error deleting entry:', error);
    }
  }

  return (
    <>
      <h1>Your Lists</h1>
      {/* <button onClick={handleShowModal} id="showFormButton" >+</button>
      {showModal && (
      // add modal divs */}
      <form onSubmit={handleAddEntry}>
        <select 
          name="list"
          onChange={handleSelectChange}
        >
          <option value="">Your Lists</option>
          <option value="Movies">Movies</option>
          <option value="Restaurants">Restaurants</option>
          <option value="Activities">Activities</option>
          <option value="Coin Toss">Coin Toss</option>
          <option value="Teams">Teams</option>
        </select>
        {/* <input name="list" placeholder="Custom List" onChange={handleChange} /> */}
        <input
          name="item"
          onChange={handleChange}
          placeholder="Add item"
        />
        {/* <input
          name="item"
          onChange={handleChange}
          placeholder="Item 2"
        /> */}
        <button type="submit">Submit</button>
      </form>     
      {/* )}    */}
      {entries.map((entry) => (
            <div className='card-container' key={entry._id}>
              {entry.item1}          
              {entry.list}
              <EditEntryForm entry={entry} fetchEntries={fetchEntries}/>
              <button onClick={() => handleDeleteEntry(entry._id)}>Delete</button>
            </div>
         ))}
         {randomItem && (
           <div>
             <h2>Random Item: {randomItem.item1}</h2>
           </div>
         )}
         <br />
         <button onClick={getRandomItem}>Generate Random Item</button>
    </>
  );
}

// radio button with onchange
// if value exists/doesntExist in state remove/add
