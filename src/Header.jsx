const Header = () => {
    return (
        <div class="bg-white shadow-md fixed top-0 left-0 right-0 z-10">
            <div class="container mx-auto flex justify-between items-center p-4">
                <h1 class="text-2xl font-bold text-blue-600">Virtual Event Platform</h1>
                <nav class="ml-auto flex space-x-4">
                    <a href="#" id="home-button" class="text-gray-700 hover:text-blue-600">Home</a>
                    <a href="./EventDashboard.jsx" id="events-button" class="text-gray-700 hover:text-blue-600">Events</a>
                    <a href="./LivePolls.jsx" id="polls-button" class="text-gray-700 hover:text-blue-600">Polls</a>
                    <a href="./QASessions.jsx" id="qa-button" class="text-gray-700 hover:text-blue-600">Q&A</a>
                    <a href="./Networking.jsx" id="networking-button" class="text-gray-700 hover:text-blue-600">Networking</a>
                    <a href="./LoginPage.jsx" id="login-btn" class="text-gray-700 hover:text-blue-600">Login</a>
                    <button id="light-mode" class="text-gray-700 hover:text-blue-600">
                        <img
                            src="https://static-00.iconduck.com/assets.00/sun-symbol-emoji-2048x2048-wityey4r.png"
                            class="h-6 w-6"
                            alt="Light Mode"
                        />
                    </button>
                    <button id="dark-mode" class="text-gray-700 hover:text-blue-600">
                        <img
                            src="https://static.thenounproject.com/png/2712425-200.png"
                            class="h-6 w-6"
                            alt="Dark Mode"
                        />
                    </button>
                </nav>
            </div>
        </div>
    );
};

export default Header;