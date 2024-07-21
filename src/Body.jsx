import React, { useRef } from 'react';
import './index.css';

function App() {
  // Create references for each section
  const homeRef = useRef(null);
  const eventsRef = useRef(null);
  const pollsRef = useRef(null);
  const qaRef = useRef(null);
  const networkingRef = useRef(null);

  // Function to scroll to the section referenced by ref
  const scrollToSection = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-gray-100 font-sans leading-relaxed tracking-wide flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto flex justify-between items-center p-4">
          <h1 className="text-2xl font-bold text-blue-600">Virtual Event Platform</h1>
          <nav className="space-x-4">
            <button onClick={() => scrollToSection(homeRef)} className="text-gray-700 hover:text-blue-600">Home</button>
            <button onClick={() => scrollToSection(eventsRef)} className="text-gray-700 hover:text-blue-600">Events</button>
            <button onClick={() => scrollToSection(pollsRef)} className="text-gray-700 hover:text-blue-600">Polls</button>
            <button onClick={() => scrollToSection(qaRef)} className="text-gray-700 hover:text-blue-600">Q&A</button>
            <button onClick={() => scrollToSection(networkingRef)} className="text-gray-700 hover:text-blue-600">Networking</button>
            <button className="text-gray-700 hover:text-blue-600">Login</button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section ref={homeRef} className="hero-bg text-white py-32">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-bold">Welcome to the Tech Conference 2024</h2>
          <p className="text-xl mt-4">Join us online for an amazing experience of tech talks and networking.</p>
          <button className="mt-8 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition">Join Now</button>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto p-6 flex-grow">
        {/* Event Details */}
        <section ref={eventsRef} className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-3xl font-semibold mb-4">Event Details</h2>
          <div id="event-info"></div>
        </section>

        {/* Live Video */}
        <section ref={pollsRef} className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-3xl font-semibold mb-4">Live Video</h2>
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src="https://www.youtube.com/embed/WkBX4N79r4w"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded-lg shadow-md"
            ></iframe>
          </div>
        </section>

        {/* Chat and Live Polls Section */}
        <section ref={qaRef} className="flex flex-col lg:flex-row bg-white p-6 rounded-lg shadow-md mb-8">
          {/* Live Chat */}
          <div className="lg:w-1/2 p-2">
            <h2 className="text-3xl font-semibold mb-4">Live Chat</h2>
            <div className="h-64 overflow-y-auto bg-gray-100 p-4 rounded-lg shadow-inner mb-4">
              <div className="mb-2">
                <span className="font-bold text-blue-600">Alice:</span>
                <span>Hi everyone!</span>
              </div>
              <div className="mb-2">
                <span className="font-bold text-blue-600">Bob:</span>
                <span>Looking forward to the event.</span>
              </div>
              <div className="mb-2">
                <span className="font-bold text-blue-600">Charlie:</span>
                <span>Can’t wait for the keynote!</span>
              </div>
            </div>
            <div className="flex">
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Type your message..."
              />
              <button className="bg-blue-500 text-white px-4 py-2 ml-2 rounded-lg hover:bg-blue-600 transition">Send</button>
            </div>
          </div>

          {/* Live Polls */}
          <div className="lg:w-1/2 p-2">
            <h2 className="text-3xl font-semibold mb-4">Live Polls</h2>
            <div id="polls-container"></div>
          </div>
        </section>

        {/* Q&A Sessions */}
        <section ref={networkingRef} className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-3xl font-semibold mb-4">Q&A Sessions</h2>
          <div id="qa-container"></div>
        </section>

        {/* Networking Opportunities */}
        <section className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-3xl font-semibold mb-4">Networking Opportunities</h2>
          <div id="networking-container"></div>
        </section>
      </main>

      {/* Footer */}
      <footer className="gradient-bg text-white p-4 text-center">
        <p>&copy; 2024 Virtual Event Platform. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;