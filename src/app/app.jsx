import React from 'react';
import Header from '../components/layout/Header/Header';
import Body from '../components/layout/Body/Body';
import Footer from '../components/layout/Footer/Footer';
import '../index.css';
import { Router } from 'preact-router';
import Login from '../components/Login/Login';
import CreateEvent from '../components/CreateEvent/CreateEvent';
import Registration from '../components/Registration/Registration';
import Recovery from '../components/PasswordRecovery/PasswordRecovery';
import EventDashboard from '../components/EventDashboard/EventDashboard';
import OpenEvent from '../components/OpenEvent/OpenEvent';
import AboutUs from '../components/AboutUs/AboutUs';

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
            <CreateEvent path="/create-event" />
            <EventDashboard path="/events-dashboard" />
            <OpenEvent path="/open-event/:eventId" />
            <AboutUs path="/about-us" />
          </Router>
        </main>
        <Footer />
      </div>
    </>
  );
}
