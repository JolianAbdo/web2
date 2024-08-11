import React from 'react';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';
import './index.css';
import { Router } from 'preact-router';
import Login from './Login';
import EventPage from './EventPage';
import Registration from './Registration';
import Recovery from './PasswordRecovery';
import EventDashboard from './EventDashboard';
import JoinEvent from './JoinEvent';
import EditEvent from './EditEvent';


export function App() {
  return (
    <>
      <div id="app">
        <Header />
        <main>
          <Router>
            <Body path="/" />
            <Login path="/login" />
            <Registration path="/register" />
            <Recovery path="/password_recovery" />
            <EventPage path="/event-page" />
            <EventDashboard path="/event-dashboard" />
            <JoinEvent path="/JoinEvent" />
            <EditEvent path="/EditEvent" />
          </Router>
        </main>
        <Footer />
      </div>
    </>
  );
}
