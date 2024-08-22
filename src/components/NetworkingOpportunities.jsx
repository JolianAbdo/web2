import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import { addOpportunity, deleteOpportunity } from '../api/opportunities'; // Import back-end functions

const NetworkingOpportunities = ({ opportunities = [], isCreator, eventId }) => {
    const [opportunityList, setOpportunityList] = useState([]); // Local state to manage networking opportunities
    const [newOpportunity, setNewOpportunity] = useState({ title: "", link: "" });
    const [isAddingOpportunity, setIsAddingOpportunity] = useState(false); // State to manage adding an opportunity

    // Load the initial opportunities from the database
    useEffect(() => {
        setOpportunityList(opportunities);
    }, [opportunities]);

    // Add a new networking opportunity and show it immediately in the UI
    const handleSaveOpportunity = async () => {
        if (newOpportunity.title.trim() && newOpportunity.link.trim()) {
            // Update the UI with the new opportunity immediately
            setOpportunityList((prevOpportunities) => [...prevOpportunities, newOpportunity]);
            setIsAddingOpportunity(false);

            // Save the new opportunity to the database
            await addOpportunity(eventId, newOpportunity);

            // Reset the new opportunity form
            setNewOpportunity({ title: "", link: "" });
        }
    };

    // Delete a networking opportunity
    const handleDeleteOpportunity = async (index) => {
        // Remove opportunity from local state
        const updatedOpportunityList = opportunityList.filter((_, i) => i !== index);
        setOpportunityList(updatedOpportunityList);

        // Delete opportunity from the database
        await deleteOpportunity(eventId, index);
    };

    return (
        <section id="networking-opportunities" class="bg-white dark:bg-slate-400 p-6 rounded-lg shadow-md mb-8">
            <h2 class="text-3xl font-semibold mb-4">Networking Opportunities</h2>
            <div class="h-64 overflow-y-auto bg-gray-100 p-4 rounded-lg shadow-inner mb-4">
                {opportunityList.length > 0 ? (
                    opportunityList.map((opportunity, index) => (
                        <div
                            key={index}
                            class="mb-4 p-4 bg-gray-200 rounded-lg shadow-md flex justify-between items-center"
                        >
                            <div>
                                <h3 class="text-xl font-semibold">{opportunity.title}</h3>
                                <a
                                    href={opportunity.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="text-blue-500 hover:underline"
                                >
                                    {opportunity.link}
                                </a>
                            </div>
                            {isCreator && (
                                <button
                                    onClick={() => handleDeleteOpportunity(index)}
                                    class="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600 transition"
                                >
                                    Delete
                                </button>
                            )}
                        </div>
                    ))
                ) : (
                    <p>No networking opportunities available.</p>
                )}
            </div>

            {isCreator && (
                <>
                    {!isAddingOpportunity ? (
                        <button
                            onClick={() => setIsAddingOpportunity(true)}
                            class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                        >
                            Add Opportunity
                        </button>
                    ) : (
                        <div class="mt-4">
                            <input
                                type="text"
                                value={newOpportunity.title}
                                onInput={(e) =>
                                    setNewOpportunity({ ...newOpportunity, title: e.target.value })
                                }
                                class="w-full p-2 border border-gray-300 rounded-lg mb-2"
                                placeholder="Opportunity Title"
                            />
                            <input
                                type="text"
                                value={newOpportunity.link}
                                onInput={(e) =>
                                    setNewOpportunity({ ...newOpportunity, link: e.target.value })
                                }
                                class="w-full p-2 border border-gray-300 rounded-lg mb-2"
                                placeholder="Opportunity Link"
                            />
                            <button
                                onClick={handleSaveOpportunity}
                                class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                            >
                                Save
                            </button>
                            <button
                                onClick={() => setIsAddingOpportunity(false)}
                                class="bg-red-500 text-white px-4 py-2 ml-2 rounded-lg hover:bg-red-600 transition"
                            >
                                Cancel
                            </button>
                        </div>
                    )}
                </>
            )}
        </section>
    );
};

export default NetworkingOpportunities;
