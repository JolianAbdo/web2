import { useState, useEffect } from "preact/hooks";
import { recoverPassword } from '../../api/passwordRecovery'; // Import the backend function
import PasswordRecoveryHTML from './PasswordRecovery.html.js'; // Import the HTML structure

const PasswordRecovery = () => {
    // State variables for managing form inputs and modal visibility
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Check if the user is logged in and set the username accordingly
    useEffect(() => {
        const loggedInUsername = localStorage.getItem("loggedInUsername");
        if (loggedInUsername) {
            setIsLoggedIn(true);
            setUsername(loggedInUsername); // Set username to loggedInUsername if user is logged in
        }
    }, []);

    // Handle redirection after password recovery is successful
    useEffect(() => {
        if (showSuccessModal) {
            // Redirect to the appropriate page based on login status
            const timer = setTimeout(() => {
                if (isLoggedIn) {
                    window.location.href = '/events-dashboard';
                } else {
                    window.location.href = '/login';
                }
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [showSuccessModal, isLoggedIn]);

    // Function to handle password recovery
    const handlePasswordRecovery = async () => {
        if (!username || !password) {
            alert('Please enter both username and password.');
            return;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match. Please try again.');
            return;
        }

        try {
            const response = await recoverPassword(username, password);
            if (response.success) {
                setShowSuccessModal(true); // Show success modal on successful recovery
            }
        } catch (err) {
            alert(err.message || "Recovery failed. Please try again.");
        }
    };

    // Pass state and handlers to the HTML component
    return PasswordRecoveryHTML({
        username,
        setUsername,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        showSuccessModal,
        setShowSuccessModal,
        isLoggedIn,
        handlePasswordRecovery,
    });
};

export default PasswordRecovery;
