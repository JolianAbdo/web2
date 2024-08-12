import { useState, useEffect } from "preact/hooks";
import { App, Credentials } from "realm-web";
import './index.css';

// MongoDB auth
const app = new App({ id: "application-0-wjjnjup" });

const Login = ({ handleLogin }) => {
    // state management
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const login = async () => {
        try {
            // using anonymous credentials for login
            const credentials = Credentials.anonymous();
            const anonymousUser = await app.logIn(credentials);
            console.log("Successfully logged in anonymously", anonymousUser);

            // pulling data from MongoDB
            const mongodb = anonymousUser.mongoClient("mongodb-atlas");
            const usersCollection = mongodb.db("Login").collection("Users");

            // querying the collection for the username and password
            const user = await usersCollection.findOne({ username: username, password: password });
            console.log("Queried User:", user);
            
            if (user) {
                console.log("Login successful for user:", user.username);
                // saving username in local storage
                localStorage.setItem("loggedInUsername", username);
                window.location.href = "/event-dashboard"; // Redirect to event dashboard
            } else {
                console.log(usersCollection);
                throw new Error("Invalid username or password.");
            }
        } catch (err) {
            console.error("Failed to log in", err);
            alert("Invalid username or password. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex bg-slate-400 dark:bg-slate-500 items-center justify-center">
            <div className="container mx-auto bg-slate-100 dark:bg-slate-600 flex flex-col gap-8 rounded-2xl w-full max-w-lg sm:w-2/3 md:w-1/2 lg:w-1/3 p-8 sm:p-12">
                <div className="flex flex-col items-center gap-4">
                    <div className="font-bold text-black text-xl sm:text-2xl">Login</div>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Username"
                        className="custom-input dark:bg-slate-300 w-full p-2 rounded-lg"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Password"
                        className="custom-input dark:bg-slate-300 w-full p-2 rounded-lg"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        onClick={login}
                        className="w-2/4 bg-blue-500 dark:bg-slate-800 text-white p-2 rounded-lg hover:bg-blue-600 transition">
                        Login
                    </button>
                    <button
                        onClick={() => window.location.href = '/'}
                        className="bg-slate-400 w-1/4 text-white p-2 py-0.5 rounded-lg hover:bg-slate-500"
                    >
                        Back
                    </button>
                    <div className="text-center mt-4">
                        <a href="/password_recovery" className="text-sm text-blue-500 dark:text-white hover:underline">
                            Forgot your password?
                        </a>
                        <span className="mx-2 text-sm text-gray-600 dark:text-white">|</span>
                        <a href="/register" className="text-sm text-blue-500 dark:text-white hover:underline">
                            Register
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
