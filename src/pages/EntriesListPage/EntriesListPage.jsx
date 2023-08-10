import React, { useState } from "react";
import { search, deleteEntry, createEntry } from "../../utilities/entries-api";
import EditEntryForm from "../../components/EditEntryForm/EditEntryForm";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import BoltTwoToneIcon from '@mui/icons-material/BoltTwoTone';
import Switch from '@mui/material/Switch';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import VideocamIcon from '@mui/icons-material/Videocam';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import GolfCourseIcon from '@mui/icons-material/GolfCourse';
import PaidIcon from '@mui/icons-material/Paid';
import PeopleIcon from '@mui/icons-material/People';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';


import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';

export default function EntriesListPage({ addEntry }) {
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState({item:"", list:""});
  const [randomItem, setRandomItem] = useState(null);
  const [randomizedEntries, setRandomizedEntries] = useState([]);
  // const [showModal, setShowModal] = useState(false);

  // Function to fetch entries from the server
  async function fetchEntries(value) {
    if (value) {
      const data = await search(value);
      setEntries(data);
    }
  }
  
  // const handleShowModal = () => {
  //   setShowModal(true);
  // };

  // const handleCloseModal = () => {
  //   setShowModal(false);
  // };

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

  const handleSwitch = () => {

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
                <div>
                  <EditEntryForm entry={entry} newEntry={newEntry} fetchEntries={fetchEntries}/>
                  <DeleteOutlineIcon onClick={() => handleDeleteEntry(entry._id)}></DeleteOutlineIcon>
                </div>  
                <div className="items">
                  {entry.item1}
                </div>
                  <Switch
                    edge="end"
                    // checked={loading}
                    onChange={handleSwitch}
                    // name="loading"
                    color="primary"
                  />
                
              </div>
          ))}

        {randomItem && (
          <div>
            <h2>Random Item: {randomItem.item1}</h2>
          </div>
        )}
        <br />
        <button id="lightningBtn" ><BoltTwoToneIcon stroke="black" strokeWidth=".3px" className="lightningBolt" onClick={getRandomItem}></BoltTwoToneIcon></button>
    </div>
  </div>
  );
}

// radio button with onchange
// new state empty array initially - as items added, added to array
// if value exists/doesntExist in state remove/add 


  // const [checked, setChecked] = React.useState(['wifi']);

  // const handleToggle = (value) => () => {
  //   const currentIndex = checked.indexOf(value);
  //   const newChecked = [...checked];

  //   if (currentIndex === -1) {
  //     newChecked.push(value);
  //   } else {
  //     newChecked.splice(currentIndex, 1);
  //   }

  //   setChecked(newChecked);
  // };



    //   <ListItem>
    //     <ListItemIcon>
    //       {/* <EditEntryForm entry={entry} newEntry={newEntry} fetchEntries={fetchEntries}/> */}
    //       <DeleteOutlineIcon onClick={() => handleDeleteEntry(entry._id)}></DeleteOutlineIcon>        
    //     </ListItemIcon>
    //     <ListItemText id="switch-list-label-wifi" primary={entry.item1} />
    //     <Switch
    //       edge="end"
    //       // onChange={handleToggle('wifi')}
    //       // checked={checked.indexOf('wifi') !== -1}
    //       inputProps={{
    //         'aria-labelledby': 'switch-list-label-wifi',
    //       }}
    //     />
    //   </ListItem>
    // </List>

