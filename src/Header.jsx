import { useState, useEffect } from 'preact/hooks';

const Header = () => {
    // Initialize state with a function to retrieve the saved value from local storage
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedMode = localStorage.getItem('isDarkMode');
        return savedMode !== null ? JSON.parse(savedMode) : false;
    });

    // Function to toggle the theme
    const toggleTheme = (isDark) => {
        const htmlElement = document.documentElement;
        if (isDark) {
            htmlElement.classList.add('dark');
        } else {
            htmlElement.classList.remove('dark');
        }
    };

    // Update local storage and theme on mode change
    useEffect(() => {
        localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
        toggleTheme(isDarkMode);
    }, [isDarkMode]);

    // Ensure the theme is set correctly on initial render
    useEffect(() => {
        toggleTheme(isDarkMode);
    }, []);

    // Handle theme toggle button clicks
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

    return (
        <div className="bg-white dark:bg-slate-800 shadow-md fixed top-0 left-0 right-0 z-10">
            <div className="container mx-auto flex justify-between items-center p-4">
                <h1 className="text-2xl font-bold text-blue-600">Virtual Event Platform</h1>
                <nav className="ml-auto flex space-x-4 text-gray-700 hover:text-blue-600">
                    <a href="./login" id="login-btn" className="text-gray-700 dark:text-blue-500 hover:text-blue-600">Login</a>
                    <button
                        id="light-mode"
                        className="text-gray-700 hover:text-blue-600"
                        onClick={toggleLight}
                    >
                        <img
                            src="https://static-00.iconduck.com/assets.00/sun-symbol-emoji-2048x2048-wityey4r.png"
                            className="h-6 w-6"
                            alt="Light Mode"
                        />
                    </button>
                    <button
                        id="dark-mode"
                        className="text-gray-700 hover:text-blue-600"
                        onClick={toggleLight}
                    >
                        <img
                            src="https://static.thenounproject.com/png/2712425-200.png"
                            className="h-6 w-6"
                            alt="Dark Mode"
                        />
                    </button>

                </nav>
            </div>
        </div>
    );
};

export default Header;
