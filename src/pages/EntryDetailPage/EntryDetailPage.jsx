import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { getEntryById } from '../../utilities/entries-service';

export default function EntryDetailPage({  }) {
  const { id } = useParams();
  const [entry, setEntry] = useState(null);


  async function fetchEntryDetails() {
    try {
      const entryDetails = await getEntryById(id);
      setEntry(entryDetails);
    } catch (error) {
      console.error('Error fetching AI model details:', error);
    }
  }
  useEffect(() => {
    fetchEntryDetails();
  }, []);

  if (!entry) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>AI Model Details</h1>
      <p>AI Model: {entry.details.AIModel}</p>
      <p>Developed By: {entry.details.DevelopedBy}</p>
      <p>Released Date: {entry.details.ReleasedDate}</p>
      <p>Pros: {entry.details.Pros}</p>
      <p>Cons: {entry.details.Cons}</p>
    </div>
  );
}
