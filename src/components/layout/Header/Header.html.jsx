const HeaderHTML = ({
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
}) => {
  return (
    <div className="bg-white dark:bg-slate-800 shadow-md fixed top-0 left-0 right-0 z-10">
      <div className="max-w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl mx-auto flex justify-between items-center p-2 sm:p-4">
        <div className="flex items-center">
          <div className="relative mr-4">
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
              <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-md shadow-lg py-2">
                {loggedIn && (
                  <>
                    <button
                      onClick={EventDashboard}
                      className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700"
                    >
                      Events Dashboard
                    </button>
                    <button
                      onClick={goToCreateEvent}
                      className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700"
                    >
                      Create Event
                    </button>
                  </>
                )}
                <button
                  onClick={goToAboutUs}
                  className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700"
                >
                  About Us
                </button>
              </div>
            )}
          </div>

          <h1
            className="text-lg sm:text-xl md:text-2xl font-bold text-blue-600 cursor-pointer"
            onClick={() => route('/')}
          >
            Virtual Event Platform
          </h1>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          {loggedIn ? (
            <div className="relative flex items-center">
              <div className="flex items-center cursor-pointer" onClick={toggleProfileDropdown}>
                <span className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full inline-block mr-1 sm:mr-2"></span>
                <p className="text-gray-600 dark:text-gray-300">
                  Logged in as: {username}
                </p>
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
              
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-md shadow-lg py-2 z-10" style={{ top: '100%' }}>
                  <button
                    onClick={goToPasswordRecovery}
                    className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700"
                  >
                    Change Password
                  </button>
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-red-500 hover:bg-red-100 dark:hover:bg-slate-700"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => route('/login')}
              id="login-btn"
              className="text-blue-500 hover:bg-blue-100 dark:hover:bg-slate-700 px-4 py-2 rounded-md transition"
            >
              Login
            </button>
          )}
          {!isDarkMode && (
            <button
              id="dark-mode"
              className="text-gray-700 hover:text-blue-600"
              onClick={toggleLight}
            >
              <img
                src="https://static.thenounproject.com/png/2712425-200.png"
                className="h-3 w-3 sm:h-5 sm:w-5"
                alt="Dark Mode"
              />
            </button>
          )}
          {isDarkMode && (
            <button
              id="light-mode"
              className="text-gray-700 hover:text-blue-600"
              onClick={toggleLight}
            >
              <img
                src="https://static.thenounproject.com/png/4808961-200.png"
                className="h-3 w-3 sm:h-5 sm:w-5"
                alt="Light Mode"
              />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderHTML;
