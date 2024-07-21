import React from 'react';

const qas = [
  { question: 'How do I join an event?', answers: ['Answer 1', 'Answer 2'] },
];

const QASessions = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Q&A Sessions</h2>
      <div className="space-y-4">
        {qas.map((qa, index) => (
          <div key={index} className="p-4 bg-gray-100 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">{qa.question}</h3>
            <ul className="list-disc pl-5">
              {qa.answers.map((answer, idx) => (
                <li key={idx}>{answer}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QASessions;
