import { useEffect } from 'react';
import { checkToken } from '../../utilities/users-service';
import * as notesService from '../../utilities/notes-service';

export default function NotesListPage({ notes, setNotes }) {

  async function handleCheckToken() {
    const expDate = await checkToken();
    alert(expDate);
  }

  const getNote = async() => {
    const newNotes = await notesService.getNotes();
    setNotes(newNotes)
  }

  useEffect(() => {
    getNote()
  }, []);  
  return (
    <>
      <h1>Notes List</h1>
        <li>
          {notes.map((n) => {
            return(
              <>
                <li>
                  {n.note}
                </li>
              </>
            )
          })}
        </li>
      
      <button onClick={handleCheckToken}>Check When My Login Expires</button>
    </>
  );
}