import EditEntryForm from '../../components/EditEntryForm/EditEntryForm';
import { updateEntry } from '../../utilities/entries-api';
import { useNavigate } from 'react-router-dom';

export default function UpdateEntryPage({ entry }) {
  const navigate = useNavigate();

  const handleUpdateEntry = async (updatedData) => {
    try {
      await updateEntry(entry._id, updatedData);
      // Redirect to the EntryDetailPage after successful update
      navigate(`/entries/${entry._id}`);
    } catch (error) {
      console.error('Error updating entry:', error);
    }
  };

  return (
    <div>
      <h1>Update AI Model</h1>
      <EditEntryForm entry={entry} handleUpdateEntry={handleUpdateEntry} />
    </div>
  );
}