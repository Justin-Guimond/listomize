import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
// import { checkToken } from "../../utilities/users-service";
// import * as entriesService from "../../utilities/entries-service";
import React, { useState, useEffect } from "react";
import { getEntries } from "../../utilities/entries-api";
import { Link } from "react-router-dom";

export default function EntriesListPage() {
  // State to store the list of entries and the data for creating a new entry
  const [entries, setEntries] = useState([]);
  const [newEntryData, setNewEntryData] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    fetchEntries();
  }, []);

  // Function to fetch entries from the server
  async function fetchEntries() {
    const data = await getEntries();
    setEntries(data);
  }

  return (
    <>
      <h1>AI Models List</h1>
      {entries.map((entry) => (
        <div>
          <Card style={{ width: "18rem" }}>
            <Link to={`/entries/${entry._id}`} key={entry._id}>
              <Card.Img variant="top" src={entry.details.imgURL} />
            </Link>
            <Card.Body>
              <Card.Title>{entry.details.AIModel}</Card.Title>
              <Card.Text>{entry.details.entry}</Card.Text>
              <a href={entry.details.tryURL} target="_blank">
                <Button variant="primary">Try it out</Button>
              </a>
            </Card.Body>
          </Card>
        </div>
      ))}
    </>
  );
}
