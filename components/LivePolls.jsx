import React from 'react';

const polls = [
  { question: 'What topic do you prefer?', options: ['Option 1', 'Option 2', 'Option 3'] },
];

const LivePolls = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Live Polls</h2>
      <div className="space-y-4">
        {polls.map((poll, index) => (
          <div key={index} className="p-4 bg-gray-100 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">{poll.question}</h3>
            <ul className="list-disc pl-5">
              {poll.options.map((option, idx) => (
                <li key={idx}>{option}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LivePolls;
