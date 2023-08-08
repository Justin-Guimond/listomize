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
        navigate('/');
      } catch (error) {
        console.error('Error deleting entry:', error);
      }
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
  
    return (
      <>
        <h1></h1>

      </>
    );
  }