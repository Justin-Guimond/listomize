import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import NewEntryPage from '../NewEntryPage/NewEntryPage';
import EntriesListPage from '../EntriesListPage/EntriesListPage';
import NavBar from '../../components/NavBar/NavBar';
import AboutPage from '../AboutPage/AboutPage';
// import * as entriesService from '../../utilities/entries-service'

export default function App() {
  const [user, setUser] = useState(getUser());
  const [entries, setEntries] = useState([]);

  function addEntry(entry) {
    setEntries([...entries, entry])
  }

  return (
    <main className="App main">
      {/* user = true */}
      { user ?
          <>
            <NavBar user={user} setUser={setUser} />
            <Routes>
              {/* Route components in here */}
              <Route path="/entries/new" element={<NewEntryPage addEntry={addEntry}/>} />
              <Route path="/entries" element={<EntriesListPage entries={entries} setEntries={setEntries} />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </>
          :
          // user = false
          <AuthPage setUser={setUser} />
      }
    </main>
  );
}
