import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import NewEntryPage from '../NewEntryPage/NewEntryPage';
import EntriesListPage from '../EntriesListPage/EntriesListPage';
import EntryDetailPage from '../EntryDetailPage/EntryDetailPage';
import UpdateEntryPage from "../UpdateEntryPage/UpdateEntryPage"
import NavBar from '../../components/NavBar/NavBar';

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
              {/* <Route path="/" element={<HomePage />} /> */}
              <Route path="/entries/new" element={<NewEntryPage addEntry={addEntry}/>} />
              <Route path="/" element={<EntriesListPage entries={entries} setEntries={setEntries} />} />
              <Route path="/*" element={<Navigate to='/entries' />} />
              <Route path="/entries/:id" element={<EntryDetailPage />} />
              <Route path="/entries/:id/edit" element={<UpdateEntryPage />} />
            </Routes>
          </>
          :
          // user = false
          <AuthPage setUser={setUser} />
      }
    </main>
  );
}