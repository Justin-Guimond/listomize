import React, { useState, useEffect } from "react";
import { getEntries, search } from "../../utilities/entries-api";
import create from "../../utilities/entries-service";
import { Link } from "react-router-dom";

export default function EntriesListPage({ addEntry }) {
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState({item:"", list:""});
  const [showModal, setShowModal] = useState(false);
  const [randomItem, setRandomItem] = useState(null);

  // useEffect(() => {
  //   fetchEntries();
  // }, []);

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
    // fetchEntries();
    console.log(newEntry);
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
      const createdEntry = await create(newEntry);
      addEntry(createdEntry); // Use the 'addEntry' prop to update the entries
      setEntries([...entries, createdEntry]);
    } catch (error) {
      console.error("Failed to create a new entry:", error.message);
    }
  }

  return (
    <>
      <h1>Your Lists</h1>
      <button onClick={handleShowModal} id="showFormButton" >+</button>
      {showModal && (
      // add modal divs
      <form onSubmit={handleAddEntry}>
        <select 
          name="list"
          onChange={handleSelectChange}
        >
          <option value="">Suggestions</option>
          <option value="Movies">Movies</option>
          <option value="Restaurants">Restaurants</option>
          <option value="Activities">Activities</option>
          <option value="Coin Toss">Coin Toss</option>
        </select>
        {/* <input name="list" placeholder="Custom List" onChange={handleChange} /> */}
        <input
          name="item"
          onChange={handleChange}
          placeholder="Item 1"
        />
        {/* <input
          name="item"
          onChange={handleChange}
          placeholder="Item 2"
        /> */}
        <button id="addItemButton" >Add More Items</button>
        <button type="submit">Submit</button>
      </form>     
      )}   
      <button onClick={getRandomItem}>Generate Random Item</button>
      {randomItem && (
        <div>
          <h2>Random Item:{randomItem.item1}</h2>
        </div>
      )}
      {entries.map((entry) => (
          <Link to={`/${entry._id}`}>
            <div className='card-container' key={entry._id}>
              {entry.item1}          
              {entry.list}
            </div>
          </Link>
         ))}
    </>
  );
}

// radio button with onchange
// if value exists/doesntExist in state remove/add
