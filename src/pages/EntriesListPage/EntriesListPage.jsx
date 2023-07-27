import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
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
                <Card style={{ width: '18rem' }}>
                  <Card.Img variant="top" src="holder.js/100px180" />
                  <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text>
                      Some quick example text to build on the card title and make up the
                      bulk of the card's content.
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                  </Card.Body>
                </Card>
          {entries.map((n) => {
            return(
                <li key={n._id}>
                  {n.entry}
                    <button onClick={() => {handleDelete(n._id)}} >Delete</button> 
                </li>
            )
          })}
      <button onClick={handleCheckToken}>Check When My Login Expires</button>
    </>
  );
}