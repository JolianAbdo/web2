document.addEventListener("DOMContentLoaded", () => {
    const authModal = document.getElementById("auth-modal");
    const loginBtn = document.getElementById("login-btn");
    const JoinBtn = document.getElementById("join-btn");
    const closeModal = document.getElementById("close-modal");
    const switchAuth = document.getElementById("switch-auth");
    const authTitle = document.getElementById("auth-title");
    const authForm = document.getElementById("auth-form");

    JoinBtn.addEventListener("click", () => {
        authModal.classList.remove("hidden");
        authTitle.textContent = "Login";
        switchAuth.textContent = "Don't have an account? Register here";
    });

    loginBtn.addEventListener("click", () => {
        authModal.classList.remove("hidden");
        authTitle.textContent = "Login";
        switchAuth.textContent = "Don't have an account? Register here";
    });

})

const Body = () => {
    const handleJoinClick = () => {
        alert('Join button clicked!');
        // Add your desired functionality here
        // For example, you could navigate to another page, open a modal, etc.
    };

    return (
        <>
            <div class="bg-slate-200 flex justify-center items-center h-screen w-full">
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

            </div>

        </>
    );
};
export default Body;