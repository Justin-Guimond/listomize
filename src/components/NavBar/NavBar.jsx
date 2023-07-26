import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <nav>
      <Link className='link-style' to="/entries">AI Models</Link>
      &nbsp; | &nbsp;
      <Link className='link-style' to="/entries/new">Add</Link>
      &nbsp;&nbsp;
      <Link to="/about">About</Link>
      &nbsp;&nbsp;
      <span>Welcome, {user.name}</span>
      &nbsp;&nbsp;<Link className='link-style' to="" onClick={handleLogOut}>Log Out</Link>
    </nav>
  );
}