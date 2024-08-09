import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Header';
import EventDashboard from './components/EventDashboard';
import LivePolls from './components/LivePolls';
import Networking from './components/Networking';
import QASessions from './components/QASessions';

export function App() {
  return (
    <Router>
      <div className="min-h-[100vh] flex flex-col">
        <div className="justify-between flex flex-row bg-green-700 text-white p-4">
          <div className="">Header</div>
          <div className="">
            <Link to="/">Home</Link>
            <Link to="/events" className="ml-4">Events</Link>
            <Link to="/live-polls" className="ml-4">Polls</Link>
            <Link to="/qa-sessions" className="ml-4">Q&A</Link>
            <Link to="/networking" className="ml-4">Networking</Link>
          </div>
        </div>
        <div className="grow p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<EventDashboard />} />
            <Route path="/live-polls" element={<LivePolls />} />
            <Route path="/networking" element={<Networking />} />
            <Route path="/qa-sessions" element={<QASessions />} />
          </Routes>
        </div>
        <div className="bg-green-700 text-white p-4">Footer</div>
      </div>
    </Router>
  );
}

export default App;
