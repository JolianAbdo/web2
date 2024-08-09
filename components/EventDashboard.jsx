import React from 'react';

const events = [
  { title: 'Event 1', description: 'Description of Event 1' },
  { title: 'Event 2', description: 'Description of Event 2' },
];

const EventDashboard = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Event Dashboard</h2>
      <div className="space-y-4">
        {events.map((event, index) => (
          <div key={index} className="p-4 bg-gray-100 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">{event.title}</h3>
            <p>{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventDashboard;