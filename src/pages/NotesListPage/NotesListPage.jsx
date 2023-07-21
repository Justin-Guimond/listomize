import { checkToken } from '../../utilities/users-service';

export default function NotesListPage() {
  async function handleCheckToken() {
    const expDate = await checkToken();
    alert(expDate);
  }
  
  return (
    <>
      <h1>Notes List</h1>
      <button onClick={handleCheckToken}>Check When My Login Expires</button>
    </>
  );
}