import React from 'react';
// import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';
import Auth from './Auth';
import './index.css';
import HeroSection from './HeroSection';

export function App() {
  return (
    <>
      <Header />
      <Body/>
      {/* <HeroSection /> */}
      <Footer />
    </>
  );
}

