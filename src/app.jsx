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
import OpenEvent from './OpenEvent';
import AboutUs from './AboutUs';


export function App() {
  return (
    <>
      <div id="app">
        <Header />
        <main className='dark:bg-slate-600'>
          <Router>
            <Body path="/" />
            <Login path="/login" />
            <Registration path="/register" />
            <Recovery path="/password_recovery" />
            <EventPage path="/event-page" />
            <EventDashboard path="/event-dashboard" />
            <OpenEvent path="/open-event/:eventId" />
            <AboutUs path="/about-us" />
          </Router>
        </main>
        <Footer />
      </div>
    </>
  );
}
