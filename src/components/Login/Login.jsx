import { useState } from "preact/hooks";
import { loginUser } from '../../api/login'; // Import the back-end function
import LoginHTML from './Login.html.jsx'; // Import the HTML structure

const Login = ({ handleLogin }) => {
    // State variables for managing user input
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // Function to handle login process
    const login = async () => {
        try {
            const user = await loginUser(username, password); // Call the back-end function

            console.log("Login successful for user:", user.username);
            localStorage.setItem("loggedInUsername", username);
            window.location.href = "/events-dashboard"; // Redirect to event dashboard
        } catch (err) {
            alert("Invalid username or password. Please try again.");
        }
    };

    // Pass state and handlers to the HTML component
    return LoginHTML({
        username,
        setUsername,
        password,
        setPassword,
        login
    });
};

export default Login;
