const AboutUs = () => {
    return (
        <div class="bg-gray-100 dark:bg-slate-500 font-sans min-h-screen p-8">
            <div className="container mx-auto bg-slate-100 dark:bg-slate-600 flex flex-col gap-8 rounded-2xl p-8 sm:p-12">
                <div className="flex flex-col gap-4">
                    <h1 className="font-bold text-black text-3xl sm:text-4xl mb-8">About Us</h1>
                    <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-200 mb-8">
                        Welcome to the <strong>Virtual Event Platform</strong>, your ultimate solution to create, host, and manage virtual events seamlessly. Our platform provides a comprehensive suite of features to ensure your event is a success:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-white dark:bg-slate-700 p-6 rounded-lg shadow-lg">
                            <h2 className="font-semibold text-xl mb-2 text-blue-600">Event Details and Privacy</h2>
                            <p className="text-gray-700 dark:text-gray-200">
                                Showcase all the essential information about your event and set your favorite attendees to make it more engaging and private.
                            </p>
                        </div>
                        <div className="bg-white dark:bg-slate-700 p-6 rounded-lg shadow-lg">
                            <h2 className="font-semibold text-xl mb-2 text-blue-600">Live Video</h2>
                            <p className="text-gray-700 dark:text-gray-200">
                                Stream your event live for attendees to watch in real-time.
                            </p>
                        </div>
                        <div className="bg-white dark:bg-slate-700 p-6 rounded-lg shadow-lg">
                            <h2 className="font-semibold text-xl mb-2 text-blue-600">Live Chat</h2>
                            <p className="text-gray-700 dark:text-gray-200">
                                Engage with your audience through an integrated chat system.
                            </p>
                        </div>
                        <div className="bg-white dark:bg-slate-700 p-6 rounded-lg shadow-lg">
                            <h2 className="font-semibold text-xl mb-2 text-blue-600">Live Polls with Voting</h2>
                            <p className="text-gray-700 dark:text-gray-200">
                                Gather real-time feedback and opinions from your audience.
                            </p>
                        </div>
                        <div className="bg-white dark:bg-slate-700 p-6 rounded-lg shadow-lg">
                            <h2 className="font-semibold text-xl mb-2 text-blue-600">Q&A Sessions</h2>
                            <p className="text-gray-700 dark:text-gray-200">
                                Host interactive sessions where participants can ask questions and get answers.
                            </p>
                        </div>
                        <div className="bg-white dark:bg-slate-700 p-6 rounded-lg shadow-lg">
                            <h2 className="font-semibold text-xl mb-2 text-blue-600">Networking Opportunities</h2>
                            <p className="text-gray-700 dark:text-gray-200">
                                Facilitate connections between attendees with dedicated networking tools.
                            </p>
                        </div>
                    </div>
                    <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-200 mt-8">
                        Our mission is to make virtual events as engaging and successful as possible. Whether you're hosting a conference, a webinar, or a social event, the Virtual Event Platform is here to support you every step of the way.
                    </p>
                </div>
                <div className="flex flex-col items-center gap-4 mt-12">
                    <h2 className="font-bold text-black text-2xl">Meet Our Team</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="flex flex-col items-center bg-white dark:bg-slate-700 p-4 rounded-lg shadow-lg">
                            <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">Leen Hawa</p>
                            <div className="flex space-x-2 mt-2">
                                <a href="https://www.linkedin.com/in/leen-hawa-685913232/" target="_blank">
                                    <img src="https://cdn-icons-png.flaticon.com/512/61/61109.png" alt="LinkedIn" className="h-6 w-6" />
                                </a>
                                <a href="https://github.com/leen7awa" target="_blank">
                                    <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="GitHub" className="h-6 w-6" />
                                </a>
                            </div>
                        </div>
                        <div className="flex flex-col items-center bg-white dark:bg-slate-700 p-4 rounded-lg shadow-lg">
                            <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">Jolian Abdo</p>
                            <div className="flex space-x-2 mt-2">
                                <a href="https://www.linkedin.com/in/jolian-abdo-b66a22229/" target="_blank">
                                    <img src="https://cdn-icons-png.flaticon.com/512/61/61109.png" alt="LinkedIn" className="h-6 w-6" />
                                </a>
                                <a href="https://github.com/JolianAbdo" target="_blank">
                                    <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="GitHub" className="h-6 w-6" />
                                </a>
                            </div>
                        </div>
                        <div className="flex flex-col items-center bg-white dark:bg-slate-700 p-4 rounded-lg shadow-lg">
                            <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">Ahmad Abo Jabal</p>
                            <div className="flex space-x-2 mt-2">
                                <a href="https://www.linkedin.com/in/ahmad-abo-jabal-30526b25b/" target="_blank">
                                    <img src="https://cdn-icons-png.flaticon.com/512/61/61109.png" alt="LinkedIn" className="h-6 w-6" />
                                </a>
                                <a href="https://github.com/AhmadAboJabal" target="_blank">
                                    <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="GitHub" className="h-6 w-6" />
                                </a>
                            </div>
                        </div>
                        <div className="flex flex-col items-center bg-white dark:bg-slate-700 p-4 rounded-lg shadow-lg">
                            <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">Mohamad Dukhi</p>
                            <div className="flex space-x-2 mt-2">
                                <a href="https://www.linkedin.com/in/mohammad-dukhi-09755326a/" target="_blank">
                                    <img src="https://cdn-icons-png.flaticon.com/512/61/61109.png" alt="LinkedIn" className="h-6 w-6" />
                                </a>
                                <a href="https://github.com/MoDukhi6" target="_blank">
                                    <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="GitHub" className="h-6 w-6" />
                                </a>
                            </div>
                        </div>
                        <div className="flex flex-col items-center bg-white dark:bg-slate-700 p-4 rounded-lg shadow-lg">
                            <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">Waseem Saleem</p>
                            <div className="flex space-x-2 mt-2">
                                <a href="https://www.linkedin.com/in/waseem-saleem-276432248/" target="_blank">
                                    <img src="https://cdn-icons-png.flaticon.com/512/61/61109.png" alt="LinkedIn" className="h-6 w-6" />
                                </a>
                                <a href="https://github.com/Waseem21Saleem" target="_blank">
                                    <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="GitHub" className="h-6 w-6" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
