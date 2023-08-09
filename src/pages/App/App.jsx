import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import EntriesListPage from '../EntriesListPage/EntriesListPage';
import EntryDetailPage from '../EntryDetailPage/EntryDetailPage';
import UpdateEntryPage from "../UpdateEntryPage/UpdateEntryPage"
import NavBar from '../../components/NavBar/NavBar';
import '../../components/NavBar/NavBar.css'

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
              <Route path="/" element={<EntriesListPage entries={entries} setEntries={setEntries} addEntry={addEntry}/>} />
              <Route path="/*" element={<Navigate to='/' />} />
              <Route path="/:id" element={<EntryDetailPage />} />
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