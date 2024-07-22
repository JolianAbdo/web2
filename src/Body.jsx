import { render } from "react";
import { useState } from "preact/hooks";
// import './index.css'


const Body = () => {

    const [activeTab, setActiveTab] = useState("home");

    const handleJoinClick = (event) => {
        const buttonId = event.currentTarget.id;
        switch (buttonId) {
            case "join-btn":
                setActiveTab("login");
                break;
            case "back-btn":
                setActiveTab("home");
                break;
                // add login button and check fields etc..
            default:
                break;
        }
    };

    const renderHomeBody = () => {
        return (
            <>
                <div class="text-center">
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
                <div className="inset-0 mx-auto container bg-slate-100 flex flex-col gap-8 rounded-2xl w-1/3 h-80 justify-center items-center p-12">
                    <div className="flex flex-col items-center gap-2">
                        <div className="font-bold text-black text-2xl">Login</div>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-black">Name</label>
                            <input type="text" id="name" name="name" className="mt-1 block w-80 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-8 mg-10 pl-2" />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-black">Password</label>
                            <input type="password" id="password" name="password" className="mt-1 block w-80 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-8 pl-2" />
                        </div>
                        <button type="submit" className="w-64 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition">Login</button>
                        <button
                            id="back-btn"
                            className="bg-slate-400 w-40 text-white p-1 rounded-lg hover:bg-slate-600"
                            onClick={handleJoinClick}
                        >
                            Back
                        </button>
                        <p id="switch-auth" class="text-center text-blue-600 mt-0 cursor-pointer">
                            Don't have an account? <span class="underline">Register here</span>
                        </p>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <div class="bg-slate-200 flex justify-center items-center h-screen w-full">
                {/* {renderHomeBody()} */}
                {/* {renderLoginScreen()} */}
                {activeTab == "home" ? renderHomeBody() : renderLoginScreen()}
            </div>

        </>
    );
};
export default Body;