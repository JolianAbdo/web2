import React from 'react';

const networking = [
  { name: 'User 1', message: 'Hello, looking forward to the event!' },
  { name: 'User 2', message: 'Hi, excited to network with you all!' },
];

const Networking = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Networking</h2>
      <div className="space-y-4">
        {networking.map((message, index) => (
          <div key={index} className="p-4 bg-gray-100 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">{message.name}</h3>
            <p>{message.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Networking;
