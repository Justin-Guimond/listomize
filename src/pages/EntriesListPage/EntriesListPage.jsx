import React, { useState, useEffect } from "react";
import { search, deleteEntry, createEntry } from "../../utilities/entries-api";
import EditEntryForm from "../../components/EditEntryForm/EditEntryForm";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import BoltTwoToneIcon from '@mui/icons-material/BoltTwoTone';
import { Paper, Switch, Box, TextField, MenuItem, Button } from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import GolfCourseIcon from '@mui/icons-material/GolfCourse';
import PaidIcon from '@mui/icons-material/Paid';
import PeopleIcon from '@mui/icons-material/People';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';

export default function EntriesListPage({ addEntry }) {
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState({item:"", list:""});
  const [randomItem, setRandomItem] = useState(null);
  const [toggledItems, setToggledItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  
  useEffect(() => {
    setToggledItems(entries.map(entry => entry.item1));
  }, [entries]);

  const handleSwitch = (event) => {
    const { checked, value } = event.target;
    if (checked) {
      console.log('Item toggled on:', value);
      setToggledItems((prevToggledItems) => [...prevToggledItems, value]);
    } else {
      console.log('Item toggled off:', value);
      setToggledItems((prevToggledItems) =>
        prevToggledItems.filter((item) => item !== value)
      );
    }
  };
  
  // Fetch entries from the server
  async function fetchEntries(value) {
    if (value) {
      const data = await search(value);
      setEntries(data);
    }
  }
  
  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  const getRandomItem = () => {
    if (toggledItems.length === 0) {
      return;
    }

    const randomIndex = Math.floor(Math.random() * toggledItems.length);
    const selectedItem = toggledItems[randomIndex];
    console.log('Selected random item:', selectedItem);
    setRandomItem(selectedItem);
    handleShowModal()
    console.log(selectedItem)
  };

  // Add new item
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

  async function handleDeleteEntry(id) {
    const userConfirmed = window.confirm('Are you sure you want to delete?');

    if (!userConfirmed) {
      return;
    }
    try {
      await deleteEntry(id);
      setEntries(entries.filter(entry => entry._id !== id));
    } catch (error) {
      console.error('Error deleting entry:', error);
    }
  }

  return (
    <div className="container">
    <Box  
          component="form"
          onSubmit={handleAddEntry}
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              name="list"
              id=""
              select
              label="Your Lists"
              defaultValue=""
              onChange={handleSelectChange}
            >
                <MenuItem value="Movies"><VideocamIcon className="videoIcon" ></VideocamIcon>Movies</MenuItem>
                <MenuItem value="Restaurants"><RestaurantIcon></RestaurantIcon>Restaurants</MenuItem>
                <MenuItem value="Activities"><GolfCourseIcon></GolfCourseIcon>Activities</MenuItem>
                <MenuItem value="Coin Toss"><PaidIcon></PaidIcon>Coin Toss</MenuItem>
                <MenuItem value="Teams"><PeopleIcon></PeopleIcon>Teams</MenuItem>
                <MenuItem value="Other"><MiscellaneousServicesIcon></MiscellaneousServicesIcon>Other</MenuItem>
            </TextField>
          </div>
            <TextField 
              name="item"
              onChange={handleChange}
              placeholder="Add item" 
              variant="outlined"
              label="Add Item"
            />
            <br />
          <Button className="submitBtn" size="small" variant="outlined" type="submit" >Submit</Button>
    </Box>
    <div className='cardContainer'>
        {entries.map((entry) => (
              <div className="list" key={entry._id}>
                <div className="scrollbar" >
                  <EditEntryForm entry={entry} newEntry={newEntry} fetchEntries={fetchEntries}/>
                  <DeleteOutlineIcon onClick={() => handleDeleteEntry(entry._id)}></DeleteOutlineIcon>
                </div>  
                <div className="items">
                  {entry.item1}
                </div>
                  <Switch
                    defaultChecked
                    edge="end"
                    value={entry.item1}
                    onChange={handleSwitch}
                    color="primary"
                  />                
              </div>
          ))}
        {showModal && randomItem && (
          <div id="randomItemBackground">
            <h2 id="randomText" className="spin">{randomItem}</h2>
          </div>
        )}
        <br />
        <button id="lightningBtn" ><BoltTwoToneIcon stroke="black" strokeWidth=".3px" className="lightningBolt" onClick={getRandomItem}></BoltTwoToneIcon></button>
    </div>
  </div>
  );
}