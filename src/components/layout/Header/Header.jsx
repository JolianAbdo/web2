import { useState, useEffect } from 'preact/hooks';
import { route } from 'preact-router';
import HeaderHTML from './Header.html.jsx'; // Import the HTML structure

const Header = ({ currentPage }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('isDarkMode');
    return savedMode !== null ? JSON.parse(savedMode) : false;
  });

  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  useEffect(() => {
    const savedUsername = localStorage.getItem("loggedInUsername");
    if (savedUsername) {
      setLoggedIn(true);
      setUsername(savedUsername);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
    toggleTheme(isDarkMode);
  }, [isDarkMode]);

  const toggleTheme = (isDark) => {
    const htmlElement = document.documentElement;
    if (isDark) {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
    }
  };

  const toggleLight = (event) => {
    const id = event.currentTarget.id;
    switch (id) {
      case 'light-mode':
        setIsDarkMode(false);
        break;
      case 'dark-mode':
        setIsDarkMode(true);
        break;
      default:
        break;
    }
  };

  const logout = () => {
    localStorage.removeItem('loggedInUsername');
    setLoggedIn(false);
    setProfileDropdownOpen(false);
    route('/login');
  };

  const goToCreateEvent = () => {
    setDropdownOpen(false);
    route('/create-event');
  };

  const goToAboutUs = () => {
    setDropdownOpen(false);
    route('/about-us');
  };

  const goToPasswordRecovery = () => {
    setProfileDropdownOpen(false);
    route('/password_recovery');
  };

  const EventDashboard = () => {
    setDropdownOpen(false);
    route('/events-dashboard');
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  return HeaderHTML({
    loggedIn,
    username,
    dropdownOpen,
    profileDropdownOpen,
    toggleDropdown,
    toggleProfileDropdown,
    logout,
    goToCreateEvent,
    goToAboutUs,
    EventDashboard,
    goToPasswordRecovery,
    toggleLight,
    isDarkMode,
    route,
  });
};

export default Header;
