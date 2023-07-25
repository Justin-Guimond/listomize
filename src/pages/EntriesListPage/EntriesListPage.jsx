import { useEffect } from 'react';
import { checkToken } from '../../utilities/users-service';
import * as entriesService from '../../utilities/entries-service';

export default function NotesListPage({ entries, setEntries }) {

  async function handleCheckToken() {
    const expDate = await checkToken();
    alert(expDate);
  }

  const getEntry = async() => {
    const newEntries = await entriesService.getEntries();
    setEntries(newEntries)
  }

  useEffect(() => {
    getEntry()
  }, []);  
  return (
    <>
      <h1>AI Models List</h1>
        <li>
          {entries.map((n) => {
            return(
              <>
                <li>
                  {n.entry}
                </li>
              </>
            )
          })}
        </li>
      
      <button onClick={handleCheckToken}>Check When My Login Expires</button>
    </>
  );
}