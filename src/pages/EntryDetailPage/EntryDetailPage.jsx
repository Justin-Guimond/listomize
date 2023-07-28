import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { getEntryById } from '../../utilities/entries-service';
import EditEntryForm from '../../components/EditEntryForm/EditEntryForm';
import { deleteEntry, updateEntry } from "../../utilities/entries-api";
import { useNavigate } from "react-router-dom";



export default function EntryDetailPage() {
  const { id } = useParams();
  const [entry, setEntry] = useState(null);
  const [entries, setEntries] = useState([]);
  const [newEntryData, setNewEntryData] = useState({
    title: "",
    description: "",
  });

  async function fetchEntryDetails() {
    try {
      const entryDetails = await getEntryById(id);
      setEntry(entryDetails);
    } catch (error) {
      console.error('Error fetching AI model details:', error);
    }
  }

  // const navigate = useNavigate();
  // // Fetch entries when the component mounts

  // useEffect(() => {
  //   fetchEntries();
  // }, []);

  // async function fetchEntries() {
  //   const data = await getEntries();
  //   setEntries(data);
  // }

  async function handleDeleteEntry(id) {
   deleteEntry(id);
      // Replace useHistory with useNavigate
      // Redirect to the EntryListPage after successful deletion
  //     navigate("/entries");
  //   } catch (error) {
  //     console.error("Error deleting entry:", error);
    
  }

  async function handleUpdateEntry(id, updatedData) {
    console.log("handleUpdateEntry called with id:", id);
    console.log("updatedData:", updatedData);
    await updateEntry(id, updatedData);
    // Refresh the entries after updating an entry
    // fetchEntries();
  }

  useEffect(() => {
    fetchEntryDetails();
  }, []);
  if (!entry) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1>AI Model Details</h1>
        {entries.map((entry) => (
            <div>
            <Link to={`/entries/${entry._id}`} key={entry._id}>              
                <Card style={{ width: '18rem' }}>
                  <Card.Img variant="top" src={entry.details.imgURL} />
                  <Card.Body>
                  <Card.Title>{entry.details.AIModel}</Card.Title>
                  <Card.Text>{entry.details.entry}</Card.Text>
                  <Card.Text>Developed by: {entry.details.DevelopedBy}</Card.Text>
                  <Card.Text>Released: {entry.details.ReleasedDate}</Card.Text>
                  <Card.Text>Pros: {entry.details.Pros}</Card.Text>
                  <Card.Text>Cons: {entry.details.Cons}</Card.Text>
                  {/* VERIFY ROUTE BELOW */}
                  {/* <Link to={`/entries/${entry._id}`} key={entry._id}> */}
                    <Button onClick={() => handleUpdateEntry(entry._id, { title: 'Updated Title', description: 'Updated Description' })}>Edit</Button>
                  {/* </Link>   */}
                  <Button onClick={() => handleDeleteEntry(entry._id)}>Delete</Button>
                  </Card.Body>
                </Card>  
              </Link>
              <EditEntryForm entry={entry} />
          </div>
        ))}
    </>
  );
}
