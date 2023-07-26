import { useEffect } from 'react';
import { checkToken } from '../../utilities/users-service';
import { deleteEntry } from '../../utilities/entries-api';
import * as entriesService from '../../utilities/entries-service';

export default function EntriesListPage({ entries, setEntries }) {

  async function handleCheckToken() {
    const expDate = await checkToken();
    alert(expDate);
  }

  const getEntry = async() => {
    const newEntries = await entriesService.getEntries();
    setEntries(newEntries)
  }

  function handleDelete(id) {
    deleteEntry(id);
    getEntry();
  }

  useEffect(() => {
    getEntry()
  }, []);  
  return (
    <>
      <h1>AI Models List</h1>
          {entries.map((n) => {
            return(
              <>
                <li>
                  {n.entry}
                    <button onClick={() => {handleDelete(n._id)}} >Delete</button> 
                </li>
              </>
            )
          })}
      <button onClick={handleCheckToken}>Check When My Login Expires</button>
    </>
  );
}