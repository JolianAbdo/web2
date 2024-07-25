import React from 'react';
// import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';
import './index.css';
import { Router } from 'preact-router';
import Login from './Login';
import Registration from './Registration';
import EventPage from './EventPage';
import EditEvent from './EditEvent';
import JoinEvent from './JoinEvent'
import HeroSection from './HeroSection';

export function App() {
  return (
    <>
      <Header />
      <Body/>
      {/* <HeroSection /> */}
      <Footer />
    
      <div id="app">
        <Router>
          <Login path="/" />
          <Registration path="/registration" />
          <EventPage path="/events" />
          <EditEvent path="/edit-event" />
          <JoinEvent path="/join" />
        </Router>
      </div>
      </> 
  );
}
