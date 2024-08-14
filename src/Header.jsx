import { useState, useEffect } from 'preact/hooks';
import { route } from 'preact-router';

const Header = ({ currentPage }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('isDarkMode');
    return savedMode !== null ? JSON.parse(savedMode) : false;
  });

  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
        alert('Unknown mode!');
        console.log(id);
        break;
    }
  };

  const logout = () => {
    localStorage.removeItem('loggedInUsername');
    setLoggedIn(false);
    route('/login');
  };

  const goToCreateEvent = () => {
    route('/event-page');
  };
  const EventDashboard = () => {
    route('/event-dashboard');
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="bg-white dark:bg-slate-800 shadow-md fixed top-0 left-0 right-0 z-10">
      <div className="max-w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl mx-auto flex justify-between items-center p-2 sm:p-4">
        <div className="flex items-center">
          <h1
            className="text-lg sm:text-xl md:text-2xl font-bold text-blue-600 cursor-pointer"
            onClick={() => route('/')}
          >
            {currentPage === 'event' ? 'Event Calendar' : 'Virtual Event Platform'}
          </h1>
          {loggedIn && (
            <div className="flex items-center ml-2 sm:ml-4">
              <span className="w-3 h-3 bg-green-500 rounded-full inline-block mr-2"></span>
              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                Logged in as: {username}
              </p>
            </div>
          )}

        </div>
        <nav className="ml-auto flex space-x-2 sm:space-x-4 text-gray-700 hover:text-blue-600">
          {!loggedIn ? (
            <a
              href="./login"
              id="login-btn"
              className="text-gray-700 dark:text-blue-500 hover:text-blue-600"
            >
              Login
            </a>
          ) : (
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="px-4 py-2 bg-white text-black dark:bg-slate-500 rounded-md focus:outline-none"
              >
                <div className="flex flex-col space-y-1">
                  <span className="block w-6 h-0.5 bg-black dark:text-white"></span>
                  <span className="block w-6 h-0.5 bg-black dark:text-white"></span>
                  <span className="block w-6 h-0.5 bg-black dark:text-white"></span>
                </div>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-md shadow-lg py-2">
                  <button
                    onClick={goToCreateEvent}
                    className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700"
                  >
                    Create Event
                  </button>
                  <button
                    onClick={EventDashboard}
                    className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700"
                  >
                    All Events
                  </button>
                  <div className="flex justify-between px-4 py-2">
                    <button
                      id="light-mode"
                      className="text-gray-700 hover:text-blue-600"
                      onClick={toggleLight}
                    >
                      <img
                        src="https://static-00.iconduck.com/assets.00/sun-symbol-emoji-2048x2048-wityey4r.png"
                        className="h-4 w-4 sm:h-6 sm:w-6"
                        alt="Light Mode"
                      />
                    </button>
                    <button
                      onClick={logout}
                      className="text-red-500 hover:bg-red-100 dark:hover:bg-slate-700 px-4 py-2 rounded-md"
                    >
                      Logout
                    </button>
                    <button
                      id="dark-mode"
                      className="text-gray-700 hover:text-blue-600"
                      onClick={toggleLight}
                    >
                      <img
                        src="https://static.thenounproject.com/png/2712425-200.png"
                        className="h-4 w-4 sm:h-6 sm:w-6"
                        alt="Dark Mode"
                      />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Header;
