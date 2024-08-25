import { useState, useEffect } from "preact/hooks";
import { recoverPassword } from './api/passwordRecovery'; // Import the backend function

const PasswordRecovery = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const loggedInUsername = localStorage.getItem("loggedInUsername");
        if (loggedInUsername) {
            setIsLoggedIn(true);
            setUsername(loggedInUsername); // Set username to loggedInUsername if user is logged in
        }
    }, []);

    useEffect(() => {
        if (showSuccessModal) {
            // Redirect to the appropriate page based on login status
            const timer = setTimeout(() => {
                if (isLoggedIn) {
                    window.location.href = '/event-dashboard';
                } else {
                    window.location.href = '/login';
                }
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [showSuccessModal, isLoggedIn]);

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

    return (
        <div class="bg-gray-100 font-sans">
            {/* Success Modal */}
            {showSuccessModal && (
                <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
                    <div class="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                        <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                            <div class="mt-3 text-center">
                                <p class="text-lg leading-6 font-medium text-gray-900">Password Successfully Updated</p>
                                <div class="mt-4">
                                    <button
                                        onClick={() => {
                                            if (isLoggedIn) {
                                                window.location.href = '/event-dashboard';
                                            } else {
                                                window.location.href = '/login';
                                            }
                                        }}
                                        class="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                    >
                                        OK
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Password Recovery Page */}
            <div className="min-h-screen flex bg-slate-400 dark:bg-slate-500 items-center justify-center">
                <div className="container mx-auto bg-slate-100 dark:bg-slate-600 flex flex-col gap-8 rounded-2xl w-full max-w-lg sm:w-2/3 md:w-1/2 lg:w-1/3 p-8 sm:p-12">
                    <div className="flex flex-col items-center gap-2">
                        <div className="font-bold text-black text-2xl">
                            {isLoggedIn ? "Change Password" : "Recover Password"}
                        </div>
                        <div className="flex items-center justify-center">
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="username" className="block text-sm font-medium text-black">Username</label>
                                    <input
                                        type="text"
                                        id="username"
                                        name="username"
                                        className="custom-input dark:bg-slate-300"
                                        value={username}
                                        onInput={e => setUsername(e.target.value)}
                                        disabled={isLoggedIn} // Disable the input if the user is logged in
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-black">New Password</label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        className="custom-input dark:bg-slate-300"
                                        value={password}
                                        onInput={e => setPassword(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-black">Confirm Password</label>
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        className="custom-input dark:bg-slate-300"
                                        value={confirmPassword}
                                        onInput={e => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-col items-center space-y-2">
                                    <button
                                        type="button"
                                        onClick={handlePasswordRecovery} // Call the backend function
                                        className="w-64 bg-blue-500 dark:bg-slate-800 dark:hover:bg-slate-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
                                    >
                                        Change Password
                                    </button>
                                    <button
                                        onClick={() => {
                                            if (isLoggedIn) {
                                                window.location.href = '/event-dashboard';
                                            } else {
                                                window.location.href = '/login';
                                            }
                                        }}
                                        className="bg-slate-400 w-40 text-white p-1 rounded-lg hover:bg-slate-500"
                                    >
                                        Back
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PasswordRecovery;
