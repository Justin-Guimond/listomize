import { Card } from 'react-bootstrap';
import { useState } from 'react';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LoginForm from '../../components/LoginForm/LoginForm';

export default function AuthPage({ setUser }) {
  const [showSignUp, setShowSignUp] = useState(false);
  return (
    <main>
      <h1>Listomize</h1>
      <Card.Img variant="top" className='icon' src="https://png.pngtree.com/png-clipart/20190516/original/pngtree-vector-lightning-button-icon-png-image_3773489.jpg" />
      <h3>Decision making made easy.</h3>
      <button onClick={() => setShowSignUp(!showSignUp)}>{showSignUp ? 'Log In' : 'Sign Up'}</button>
      { showSignUp ?
          <SignUpForm setUser={setUser} />
          :
          <LoginForm setUser={setUser} />
      }
    </main>
  );
}