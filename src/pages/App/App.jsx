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
import HomePage from '../HomePage/HomePage';

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
              <Route path="/" element={<HomePage />} />
              <Route path="/entries/new" element={<NewEntryPage addEntry={addEntry}/>} />
              <Route path="/entries" element={<EntriesListPage entries={entries} setEntries={setEntries} />} />
              <Route path="/*" element={<Navigate to='/entries' />} />
              <Route path="/entries/:id" element={<EntryDetailPage />} />
              {/* VERIFY ROUTE BELOW */}
              <Route path="/entries/:id" element={<UpdateEntryPage />} />
            </Routes>
          </>
          :
          // user = false
          <AuthPage setUser={setUser} />
      }
    </main>
  );
}