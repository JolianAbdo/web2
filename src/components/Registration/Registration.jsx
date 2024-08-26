import { useState, useEffect } from "preact/hooks";
import { registerUser } from '../../api/registerUser'; // Import the backend function
import RegistrationHTML from './Registration.html.js'; // Import the HTML structure

const Registration = () => {
    // State variables for managing form inputs and modal display
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    // Effect to handle redirection after successful registration
    useEffect(() => {
        if (showSuccessModal) {
            const timer = setTimeout(() => {
                window.location.href = '/login';
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [showSuccessModal]);

    // Function to handle the registration process
    const handleRegistration = async () => {
        if (password !== confirmPassword) {
            alert('Passwords do not match. Please try again.');
            return;
        }

        try {
            const response = await registerUser(username, password);
            if (response.success) {
                setShowSuccessModal(true); // Show success modal on successful registration
            }
        } catch (err) {
            alert(err.message || "Registration failed. Please try again.");
        }
    };

    // Pass state and handlers to the HTML component
    return RegistrationHTML({
        showSuccessModal,
        username,
        setUsername,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        handleRegistration,
    });
};

export default Registration;
