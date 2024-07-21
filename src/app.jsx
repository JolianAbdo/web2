import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Home from './Home';
import Auth from './Auth';
import './index.css';

const App = () => {
  return (
    <Router>
      <div className="bg-gray-100 font-sans leading-relaxed tracking-wide flex flex-col min-h-screen">
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/auth" component={Auth} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
};

const Header = () => (
  <header className="bg-white shadow-md">
    <div className="container mx-auto flex justify-between items-center p-4">
      <h1 className="text-2xl font-bold text-blue-600">Virtual Event Platform</h1>
      <nav className="space-x-4">
        <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
        <a href="#event-details" className="text-gray-700 hover:text-blue-600">Events</a>
        <a href="#live-polls" className="text-gray-700 hover:text-blue-600">Polls</a>
        <a href="#qa-sessions" className="text-gray-700 hover:text-blue-600">Q&A</a>
        <a href="#networking-opportunities" className="text-gray-700 hover:text-blue-600">Networking</a>
        <Link to="/auth" className="text-gray-700 hover:text-blue-600">Login</Link>
      </nav>
    </div>
  </header>
);

const Footer = () => (
  <footer className="gradient-bg text-white p-4 text-center">
    <p>&copy; 2024 Virtual Event Platform. All rights reserved.</p>
  </footer>
);

export default App;
