import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { checkToken } from "../../utilities/users-service";
import * as entriesService from "../../utilities/entries-service";
import React, { useState, useEffect } from "react";
import {
  getEntries,
  createEntry,
  deleteEntry,
  updateEntry,
} from "../../utilities/entries-api";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function YourComponent() {
  // State to store the list of entries and the data for creating a new entry
  const [entries, setEntries] = useState([]);
  const [newEntryData, setNewEntryData] = useState({
    title: "",
    description: "",
  });

  const navigate = useNavigate();
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
    try {
      await deleteEntry(id);
      // Replace useHistory with useNavigate
      // Redirect to the EntryListPage after successful deletion
      navigate("/entries");
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
  }
  //i added console logs to see what is the issue to start debigging ******
  async function handleUpdateEntry(id, updatedData) {
    console.log("handleUpdateEntry called with id:", id);
    console.log("updatedData:", updatedData);
    await updateEntry(id, updatedData);
    // Refresh the entries after updating an entry
    fetchEntries();
  }
  //i added console logs to see what is the issue to start debigging********

  return (
    <>
      <h1>AI Models List</h1>
        {entries.map((entry) => (
            <div>
              <Link to={`/entries/${entry._id}`} key={entry._id}>
                <Card style={{ width: '18rem' }}>
                  {/* add form field with img url that gets dynamically put in source below */}
                  <Card.Img variant="top" src={entry.details.imgURL} />
                  <Card.Body>
                  <Card.Title>{entry.details.AIModel}</Card.Title>
                  <Card.Text>{entry.details.entry}</Card.Text>
                  <Button onClick={() => handleUpdateEntry(entry._id, { title: 'Updated Title', description: 'Updated Description' })}>Edit</Button>
                  <Button onClick={() => handleDeleteEntry(entry._id)}>Delete</Button>
                  {/* add form field with url that auto populates into it's associated 'try it out' button */}
                  <a href={entry.details.tryURL} target="_blank" ><Button variant="primary">Try it out</Button></a>
                  </Card.Body>
                </Card>  
               </Link>
            </div>
        ))}
    </>
  );
}
