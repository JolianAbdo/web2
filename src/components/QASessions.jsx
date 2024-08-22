import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import { addQA, deleteQA } from '../api/qa'; // Import back-end functions

const QASessions = ({ qaSessions = [], isCreator, eventId }) => {
    const [qaList, setQaList] = useState([]); // Local state to manage Q&A sessions
    const [newQA, setNewQA] = useState({ question: "", answer: "" });
    const [isAddingQA, setIsAddingQA] = useState(false); // State to manage adding a Q&A

    // Load the initial Q&A sessions from the database
    useEffect(() => {
        setQaList(qaSessions);
    }, [qaSessions]);

    // Add a new Q&A session and show it immediately in the UI
    const handleSaveQA = async () => {
        if (newQA.question.trim() && newQA.answer.trim()) {
            // Update the UI with the new Q&A immediately
            setQaList((prevQaList) => [...prevQaList, newQA]);
            setIsAddingQA(false);

            // Save the new Q&A to the database
            await addQA(eventId, newQA);

            // Reset the new Q&A form
            setNewQA({ question: "", answer: "" });
        }
    };

    // Delete a Q&A session
    const handleDeleteQA = async (qaIndex) => {
        // Remove Q&A from local state
        const updatedQaList = qaList.filter((_, index) => index !== qaIndex);
        setQaList(updatedQaList);

        // Delete Q&A from the database
        await deleteQA(eventId, qaIndex);
    };

    return (
        <section id="qa-sessions" class="bg-white p-6 dark:bg-slate-400 rounded-lg shadow-md mb-8">
            <h2 class="text-3xl font-semibold mb-4">Q&A Sessions</h2>
            <div id="qa-container">
                {qaList.length ? (
                    qaList.map((qa, index) => (
                        <div key={index} class="mb-4 p-4 bg-gray-200 rounded-lg shadow-md">
                            <div class="flex justify-between items-center">
                                <div>
                                    <h3 class="text-xl font-semibold">{qa.question}</h3>
                                    <p>{qa.answer}</p>
                                </div>
                                {isCreator && (
                                    <button
                                        onClick={() => handleDeleteQA(index)}
                                        class="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600 transition"
                                    >
                                        Delete
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No Q&A sessions available.</p>
                )}
            </div>
            {isCreator && (
                <>
                    {!isAddingQA && (
                        <button
                            onClick={() => setIsAddingQA(true)}
                            class="bg-blue-500 text-white px-4 py-2 mt-4 rounded-lg hover:bg-blue-600 transition"
                        >
                            Add Q&A
                        </button>
                    )}
                    {isAddingQA && (
                        <div class="mt-4">
                            <input
                                type="text"
                                placeholder="Question"
                                value={newQA.question}
                                onInput={(e) => setNewQA({ ...newQA, question: e.target.value })}
                                class="w-full p-2 border border-gray-300 rounded-lg mb-2"
                            />
                            <textarea
                                placeholder="Answer"
                                value={newQA.answer}
                                onInput={(e) => setNewQA({ ...newQA, answer: e.target.value })}
                                class="w-full p-2 border border-gray-300 rounded-lg mb-2"
                            />
                            <div class="flex justify-between">
                                <button
                                    onClick={handleSaveQA}
                                    class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                                >
                                    Save Q&A
                                </button>
                                <button
                                    onClick={() => setIsAddingQA(false)}
                                    class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </section>
    );
};

export default QASessions;
