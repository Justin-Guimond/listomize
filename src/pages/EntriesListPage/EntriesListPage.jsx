import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import React, { useState, useEffect } from "react";
import { getEntries } from "../../utilities/entries-api";
import { Link } from "react-router-dom";

export default function EntriesListPage() {
  // State to store the list of entries
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

  // Function to open the "Try it out" URL in a new tab
  function handleTryItOut(url) {
    window.open(url, "_blank", "noopener noreferrer");
  }

  return (
    <>
      <h1>AI Models List</h1>
        {entries.map((entry) => (
          <div className='card-container' key={entry._id}>
            <Card style={{ width: "18rem" }}>
              <Link to={`/entries/${entry._id}`}>
                <Card.Img variant="top" src={entry.details.imgURL} />
              </Link>
              <Card.Body>
                <Card.Title>{entry.details.AIModel}</Card.Title>
                <Card.Text>{entry.details.entry}</Card.Text>
                {/* Use onClick event to open URL in a new tab */}
                <Button
                  variant="primary"
                  onClick={() => handleTryItOut(entry.details.tryURL)}
                >
                  Try it out
                </Button>
              </Card.Body>
            </Card>
          </div>
         ))}
    </>
  );
}
