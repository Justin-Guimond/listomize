import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
        <Navbar expand='sm' className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand href="/">Listomize</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              {/* <Nav.Link as={Link} to="/entries">AI Apps</Nav.Link>
              &nbsp;&nbsp;
              <Nav.Link as={Link} to="/entries/new">Add</Nav.Link>
              &nbsp;&nbsp;
              <Navbar.Text><span>Welcome, {user.name}</span></Navbar.Text>
              &nbsp;&nbsp; */}
              <Nav.Link onClick={handleLogOut}>Log Out</Nav.Link>
            </Nav>  
          </Navbar.Collapse>
        </Container>
      </Navbar>
  );
}