import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import { route } from "preact-router";
import Login from "../../Login";
import Registration from "../../Registration";
import PasswordRecovery from "../../PasswordRecovery";

const Body = () => {
  // State variables to manage active tab and login status
  const [activeTab, setActiveTab] = useState("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Array of image URLs for the hero section background
  const images = [
    "https://funds2orgs.com/wp-content/uploads/2022/03/Volunteer-event-management.jpg",
    "https://www.agilitypr.com/wp-content/uploads/2020/09/virtual-1.jpg",
    "https://webbiquity.com/wp-content/uploads/2020/08/Teooh-virtual-conference-scaled.jpg",
    "https://veekast.com/wp-content/uploads/2021/02/2020.10_mktg_BlogHeader_VirtualEvents_AP.png",
  ];

  // Preload images to avoid delays in background switching
  const preloadedImages = images.map((src) => {
    const img = new Image();
    img.src = src;
    return img;
  });

  // Function to change the background image of the hero section
  function changeHeroBackground() {
    const heroSection = document.getElementById("hero-section");
    let index = 1;
    heroSection.style.backgroundImage = `url(${preloadedImages[0].src})`;
    setInterval(() => {
      heroSection.style.backgroundImage = `url(${preloadedImages[index].src})`;
      index = (index + 1) % preloadedImages.length;
    }, 5000); // Change image every 5 seconds
  }

  // useEffect to initialize background change and check login status on component mount
  useEffect(() => {
    changeHeroBackground();

    // Check if the user is logged in by looking for their username in localStorage
    const loggedInUsername = localStorage.getItem("loggedInUsername");
    if (loggedInUsername) {
      setIsLoggedIn(true);
    }
  }, []);

  // Handle "Join Now" or "Events Dashboard" button click based on login status
  const handleJoinClick = () => {
    if (isLoggedIn) {
      route("/events-dashboard");
    } else {
      route("/register");
    }
  };

  // Handle successful login, set login status, and redirect to the event dashboard
  const handleLogin = () => {
    setIsLoggedIn(true);
    route("/events-dashboard");
  };

  // Render the home page content
  const renderHomeBody = () => {
    return (
      <div class="text-center text-white">
        <h2 class="text-5xl font-bold bg-black bg-opacity-50 text-white px-2 py-1 inline-block rounded">
          Welcome to Virtual Event Planner
        </h2>
        <p class="text-xl mt-4 bg-black bg-opacity-50 text-white px-2 py-1 inline-block rounded">
          Join us online for an amazing experience of tech talks and networking.
        </p>
        <div style="margin-top: 2px;"></div>
        <button
          id="join-btn"
          class="mt-8 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
          onClick={handleJoinClick}
        >
          {isLoggedIn ? "Events Dashboard" : "Join Now"}
        </button>
      </div>
    );
  };

  // Render the appropriate content based on the active tab
  const renderPages = () => {
    switch (activeTab) {
      case "home":
        return renderHomeBody();
      case "login":
        return <Login handleLogin={handleLogin} />;
      case "register":
        return <Registration handleRegister={handleLogin} />;
      case "password_recovery":
        return <PasswordRecovery handleRecovery={handleLogin} />;
      default:
        break;
    }
  };

  // Return the main hero section with the rendered page content
  return (
    <div
      id="hero-section"
      class="h-screen bg-cover bg-center flex justify-center items-center w-full"
      style={{ backgroundImage: `url(${preloadedImages[0].src})` }}
    >
      {renderPages()}
    </div>
  );
};

export default Body;
