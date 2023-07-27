import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    // <nav>
    //   <Link className='link-style' to="/">AI Central</Link>
    //   &nbsp; | &nbsp;
    //   <Link className='link-style' to="/entries">AI Models</Link>
    //   &nbsp; | &nbsp;
    //   <Link className='link-style' to="/entries/new">Add</Link>
    //   &nbsp;&nbsp;
    //   <span>Welcome, {user.name}</span>
    //   &nbsp;&nbsp;<Link className='link-style' to="" onClick={handleLogOut}>Log Out</Link>
    // </nav>
        <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">AI Central</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              <Nav.Link as={Link} to="/entries">AI Models</Nav.Link>
              &nbsp;&nbsp;
              <Nav.Link as={Link} to="/entries/new">Add</Nav.Link>
              &nbsp;&nbsp;
              <Navbar.Text><span>Welcome, {user.name}</span></Navbar.Text>
              &nbsp;&nbsp;
              <Nav.Link onClick={handleLogOut}>Log Out</Nav.Link>
            </Nav>  
          </Navbar.Collapse>
        </Container>
      </Navbar>
  );
}