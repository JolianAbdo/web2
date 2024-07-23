import { render } from "react";
import { useState } from "preact/hooks";
// import './index.css'
import HeroSection from './HeroSection';
import SwitchScreen from "../components/LoginOrRegister";


const Body = () => {
    const [activeTab, setActiveTab] = useState("home");

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

    const HeroSection = () => {
        useEffect(() => {
            changeHeroBackground();
        }, []);
    }

    const handleJoinClick = (event) => {
        const buttonId = event.currentTarget.id;
        switch (buttonId) {
            case "join-btn":
                console.log(activeTab);
                setActiveTab("login");
                break;
            case "back-btn":
                setActiveTab("home");
                break;
            case "register-btn":
                setActiveTab("register");
                break;
            default:
                console.log(activeTab);
                break;
        }
    };

    const renderHomeBody = () => {
        return (
            <>
                <div class="text-center text-white">
                    <h2 class="text-5xl font-bold">Welcome to Virtual Event Planner</h2>
                    <p class="text-xl mt-4">Join us online for an amazing experience of tech talks and networking.</p>
                    <button
                        id="join-btn"
                        className="mt-8 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
                        onClick={handleJoinClick}
                    >
                        Join Now
                    </button>
                </div>
            </>
        )
    }

    const renderLoginScreen = () => {
        return (
            <>
                <SwitchScreen
                    title="Login"
                    buttonText="Login"
                    btnName="register-btn"
                    alternateText="Don't have an account?"
                    alternateActionText="Register here"
                    handleButtonClick={handleJoinClick}
                />
            </>
        )
    }

    const renderRegisterScreen = () => {
        return (
            <>
                <SwitchScreen
                    title="Register"
                    buttonText="Register"
                    btnName="join-btn"
                    alternateText="Already have an account?"
                    alternateActionText="Login here"
                    handleButtonClick={handleJoinClick}
                />
            </>
        )
    }

    const renderpages = () => {
        switch (activeTab) {
            case "home":
                return renderHomeBody();
            case "login":
                return renderLoginScreen();
            case "register":
                return renderRegisterScreen();
            default:
                break;
        }
    }

    return (
        <>
            {/* {changeHeroBackground()} */}
            <div
                id="hero-section"
                className="h-screen bg-cover bg-center flex justify-center items-center w-full"
                style={{ backgroundImage: `url(${preloadedImages[0].src})` }}
            >
                {renderpages()}
            </div>
        </>
    );
};
export default Body;