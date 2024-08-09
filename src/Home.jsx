import React from 'react';

const Home = () => {
  return (
    <div className="flex-grow">
      <HeroSection />
      <main className="container mx-auto p-6">
        <EventDetails />
        <LiveVideo />
        <ChatAndPolls />
        <QASessions />
        <NetworkingOpportunities />
      </main>
    </div>
  );
};

const HeroSection = () => (
  <section id="hero-section" className="hero-bg text-white py-32">
    <div className="container mx-auto text-center">
      <h2 className="text-5xl font-bold">Welcome to the Tech Conference 2024</h2>
      <p className="text-xl mt-4">Join us online for an amazing experience of tech talks and networking.</p>
      <button className="mt-8 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition">
        Join Now
      </button>
    </div>
  </section>
);

const EventDetails = () => (
  <section id="event-details" className="bg-white p-6 rounded-lg shadow-md mb-8">
    <h2 className="text-3xl font-semibold mb-4">Event Details</h2>
    <div id="event-info"></div>
  </section>
);

const LiveVideo = () => (
  <section id="live-video" className="bg-white p-6 rounded-lg shadow-md mb-8">
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
);

const ChatAndPolls = () => (
  <section className="flex flex-col lg:flex-row bg-white p-6 rounded-lg shadow-md mb-8">
    <LiveChat />
    <LivePolls />
  </section>
);

const LiveChat = () => (
  <div id="chat-section" className="lg:w-1/2 p-2">
    <h2 className="text-3xl font-semibold mb-4">Live Chat</h2>
    <div id="chat-container" className="h-64 overflow-y-auto bg-gray-100 p-4 rounded-lg shadow-inner mb-4">
      {/* Fake chat messages */}
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
      <button className="bg-blue-500 text-white px-4 py-2 ml-2 rounded-lg hover:bg-blue-600 transition">
        Send
      </button>
    </div>
  </div>
);

const LivePolls = () => (
  <div id="live-polls" className="lg:w-1/2 p-2">
    <h2 className="text-3xl font-semibold mb-4">Live Polls</h2>
    <div id="polls-container"></div>
  </div>
);

const QASessions = () => (
  <section id="qa-sessions" className="bg-white p-6 rounded-lg shadow-md mb-8">
    <h2 className="text-3xl font-semibold mb-4">Q&A Sessions</h2>
    <div id="qa-container"></div>
  </section>
);

const NetworkingOpportunities = () => (
  <section id="networking-opportunities" className="bg-white p-6 rounded-lg shadow-md mb-8">
    <h2 className="text-3xl font-semibold mb-4">Networking Opportunities</h2>
    <div id="networking-container"></div>
  </section>
);

export default Home;
