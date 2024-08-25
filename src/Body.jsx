import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import { route } from "preact-router";
import Login from "./Login";
import Registration from "./Registration";
import PasswordRecovery from "./PasswordRecovery";

const Body = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const images = [
    "https://funds2orgs.com/wp-content/uploads/2022/03/Volunteer-event-management.jpg",
    "https://www.agilitypr.com/wp-content/uploads/2020/09/virtual-1.jpg",
    "https://webbiquity.com/wp-content/uploads/2020/08/Teooh-virtual-conference-scaled.jpg",
    "https://veekast.com/wp-content/uploads/2021/02/2020.10_mktg_BlogHeader_VirtualEvents_AP.png",
  ];

  const preloadedImages = images.map((src) => {
    const img = new Image();
    img.src = src;
    return img;
  });

  function changeHeroBackground() {
    const heroSection = document.getElementById("hero-section");
    let index = 1;
    heroSection.style.backgroundImage = `url(${preloadedImages[0].src})`;
    setInterval(() => {
      heroSection.style.backgroundImage = `url(${preloadedImages[index].src})`;
      index = (index + 1) % preloadedImages.length;
    }, 5000); // Change image every 5 seconds
  }

  useEffect(() => {
    changeHeroBackground();

    // Check if user is logged in (This is just an example; adjust logic as needed)
    const loggedInUsername = localStorage.getItem("loggedInUsername");
    if (loggedInUsername) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleJoinClick = () => {
    if (isLoggedIn) {
      route("/event-dashboard");
    } else {
      route("/register");
    }
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    route("/event-dashboard");
  };

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
