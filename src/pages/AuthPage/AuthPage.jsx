import { useState } from 'react';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LoginForm from '../../components/LoginForm/LoginForm';
import BoltTwoToneIcon from '@mui/icons-material/BoltTwoTone';


export default function AuthPage({ setUser }) {
  const [showSignUp, setShowSignUp] = useState(false);
  return (
    <main>
      <h1><i>Listomize</i></h1>
      <button id="authLightning" ><BoltTwoToneIcon stroke="black" strokeWidth=".3px" className="lightningBolt"></BoltTwoToneIcon></button>
      <h3>Decision making made easy.</h3>
      <button className="authBtns" onClick={() => setShowSignUp(!showSignUp)}>{showSignUp ? 'Log In' : 'Sign Up'}</button>
      { showSignUp ?
          <SignUpForm setUser={setUser} />
          :
          <LoginForm setUser={setUser} />
      }
    </main>
  );
}