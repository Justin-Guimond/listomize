import { Card } from 'react-bootstrap';
import { useState } from 'react';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LoginForm from '../../components/LoginForm/LoginForm';

export default function AuthPage({ setUser }) {
  const [showSignUp, setShowSignUp] = useState(false);
  return (
    <main>
      <h1>AI Central</h1>
      <Card.Img variant="top" className='icon' src="https://img.icons8.com/?size=512&id=PYdgh00GlQoV&format=png" />
      <h3>We are a team of artificial intelligence (AI) enthusiasts passionate about exploring AI apps. Our goal is to share our knowledge and expertise with the AI community and help advance the field of artificial intelligence. Feel free to explore our collection of AI apps and learn more about the exciting world of AI.</h3>
      <button onClick={() => setShowSignUp(!showSignUp)}>{showSignUp ? 'Log In' : 'Sign Up'}</button>
      { showSignUp ?
          <SignUpForm setUser={setUser} />
          :
          <LoginForm setUser={setUser} />
      }
    </main>
  );
}