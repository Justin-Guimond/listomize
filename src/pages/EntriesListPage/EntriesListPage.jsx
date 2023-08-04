import React, { useState, useEffect } from "react";
import { getEntries } from "../../utilities/entries-api";

export default function EntriesListPage() {
  const [entries, setEntries] = useState([]);


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
      <h1>Your Lists</h1>
      <h3>Movies</h3>
        {entries.map((entry) => (
          <div className='card-container' key={entry._id}>
          </div>
         ))}
    </>
  );
}
