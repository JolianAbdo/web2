import Login from "../../Login";
import Registration from "../../Registration";
import PasswordRecovery from "../../PasswordRecovery";

const BodyHTML = ({
  activeTab,
  setActiveTab,
  isLoggedIn,
  handleJoinClick,
  handleLogin,
  preloadedImages,
}) => {
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

export default BodyHTML;
