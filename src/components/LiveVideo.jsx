import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import { saveLiveLink } from '../api/liveVideo'; // Import back-end function

const LiveVideo = ({ event, isCreator, eventId }) => {
    const [liveLink, setLiveLink] = useState(event?.liveLink || ""); // State to manage the live video link
    const [isEditingLiveLink, setIsEditingLiveLink] = useState(false); // State to manage editing mode
    const [editedLiveLink, setEditedLiveLink] = useState(liveLink); // State to manage the input value

    // Update the live link when the event changes
    useEffect(() => {
        setLiveLink(event?.liveLink || "");
    }, [event]);

    // Save the new live video link
    const handleSaveLiveLink = async () => {
        // Update the live link in the UI immediately
        setLiveLink(editedLiveLink);
        setIsEditingLiveLink(false);

        // Save the new live link to the database
        await saveLiveLink(eventId, editedLiveLink);
    };

    return (
        <section id="live-video" class="bg-white dark:bg-slate-400 p-6 rounded-lg shadow-md mb-8">
            <h2 class="text-3xl font-semibold mb-4">Live Video</h2>
            <div class="w-full h-[32rem]">
                <iframe
                    src={liveLink}
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                    class="w-full h-full rounded-lg shadow-md"
                ></iframe>
            </div>

            {isCreator && !isEditingLiveLink && (
                <button
                    onClick={() => {
                        setEditedLiveLink(liveLink);
                        setIsEditingLiveLink(true);
                    }}
                    class="bg-yellow-500 text-white px-4 py-2 mt-4 rounded-lg hover:bg-yellow-600 transition"
                >
                    Edit Live Link
                </button>
            )}

            {isEditingLiveLink && (
                <div class="mt-4">
                    <input
                        type="text"
                        value={editedLiveLink}
                        onInput={(e) => setEditedLiveLink(e.target.value)}
                        class="w-full p-2 border border-gray-300 rounded-lg mb-2"
                    />
                    <button
                        onClick={handleSaveLiveLink}
                        class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                    >
                        Save
                    </button>
                    <button
                        onClick={() => setIsEditingLiveLink(false)}
                        class="bg-red-500 text-white px-4 py-2 ml-2 rounded-lg hover:bg-red-600 transition"
                    >
                        Cancel
                    </button>
                </div>
            )}
        </section>
    );
};

export default LiveVideo;
