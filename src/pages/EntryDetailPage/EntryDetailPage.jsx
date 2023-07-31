import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useState, useEffect, useCallback } from 'react';
import { getEntryById } from '../../utilities/entries-service';
import { deleteEntry, updateEntry } from "../../utilities/entries-api";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import EditEntryForm from '../../components/EditEntryForm/EditEntryForm';


export default function EntryDetailPage() {
    const { id } = useParams();
    const [entry, setEntry] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();
  
    const fetchEntryDetails = useCallback(async () => {
      try {
        const entryDetails = await getEntryById(id);
        setEntry(entryDetails);
      } catch (error) {
        console.error('Error fetching AI model details:', error);
      }
    }, [id]);
  
    useEffect(() => {
      fetchEntryDetails();
    }, [fetchEntryDetails]);
  
    async function handleDeleteEntry(id) {
      try {
        await deleteEntry(id);
        navigate('/entries');
      } catch (error) {
        console.error('Error deleting entry:', error);
      }
    }
  
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toISOString().split('T')[0];
    }

    async function handleUpdateEntry(updatedData) {
        console.log("handleUpdateEntry called with id:", id);
        console.log("updatedData:", updatedData);
        try {
          await updateEntry(entry._id, updatedData);
          // Refresh the entry details after updating
          fetchEntryDetails();
          setIsEditing(false); // After update, set isEditing to false to display details again
        } catch (error) {
          console.error('Error updating entry:', error);
        }
      }
  
    if (!entry) {
      return <div>Loading...</div>;
    }

      // Function to open the "Try it out" URL in a new tab
    function handleTryItOut(url) {
    window.open(url, "_blank", "noopener noreferrer");
    }
  
    return (
      <>
        <h1>AI Model Details</h1>
        {isEditing ? (
          <EditEntryForm entry={entry} handleUpdateEntry={handleUpdateEntry} />
        ) : (
          <div className="detail-card" >
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src={entry.details.imgURL} />
              <Card.Body>
                <Card.Title>{entry.details.AIModel}</Card.Title>
                <Card.Text>{entry.details.entry}</Card.Text>
                <Card.Text><b>Developed by: </b>{entry.details.DevelopedBy}</Card.Text>
                <Card.Text><b>Released: </b>{formatDate(entry.details.ReleasedDate)}</Card.Text>
                <Card.Text><b>Pros: </b>{entry.details.Pros}</Card.Text>
                <Card.Text><b>Cons: </b>{entry.details.Cons}</Card.Text>
                <Button onClick={() => setIsEditing(true)}>Edit</Button>
                <Button onClick={() => handleDeleteEntry(entry._id)}>Delete</Button>
                <Button
                  variant="primary"
                  onClick={() => handleTryItOut(entry.details.tryURL)}
                >
                  Try it out
                </Button>
              </Card.Body>
            </Card>
          </div>
        )}
      </>
    );
  }