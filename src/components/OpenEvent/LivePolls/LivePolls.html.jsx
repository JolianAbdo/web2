const LivePollsHTML = ({
  pollList,
  newPoll,
  selectedPoll,
  pollSelections,
  isAddingPoll,
  isCreator,
  handleOptionSelect,
  handleSavePoll,
  handleDeletePoll,
  setNewPoll,
  setIsAddingPoll,
  setSelectedPoll,
}) => (
  <div id="live-polls" class="lg:w-1/2 p-2">
    <h2 class="text-3xl font-semibold mb-4">Live Polls</h2>
    <div
      id="polls-container"
      class="h-64 overflow-y-auto bg-gray-100 p-4 rounded-lg shadow-inner"
    >
      {pollList.length ? (
        pollList.map((poll, pollIndex) => {
          if (
            !poll ||
            typeof poll.question !== "string" ||
            !Array.isArray(poll.options)
          ) {
            console.warn("Skipping malformed poll:", poll);
            return null; // Skip if poll is malformed
          }

          return (
            <div
              key={pollIndex}
              class="mb-4 p-4 bg-gray-200 rounded-lg shadow-md"
            >
              <div class="flex justify-between items-center">
                <h3
                  class="text-xl font-semibold cursor-pointer"
                  onClick={() =>
                    setSelectedPoll(
                      selectedPoll === pollIndex ? null : pollIndex
                    )
                  }
                >
                  {poll.question}
                </h3>
                {isCreator && (
                  <button
                    onClick={() => handleDeletePoll(pollIndex)}
                    class="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                )}
              </div>
              {selectedPoll === pollIndex && (
                <div class="mt-4">
                  {poll.options.map((option, optionIndex) => {
                    const totalVotes = poll.options.reduce(
                      (acc, opt) => acc + opt.counter,
                      0
                    );
                    const isOptionSelected =
                      pollSelections[pollIndex] === optionIndex;
                    const percentage =
                      totalVotes > 0
                        ? ((option.counter / totalVotes) * 100).toFixed(2)
                        : 0;
                    return (
                      <button
                        key={optionIndex}
                        class={`w-full p-2 mb-2 rounded-lg ${
                          isOptionSelected
                            ? "bg-green-500 text-white"
                            : pollSelections[pollIndex] !== undefined
                            ? "bg-gray-400"
                            : "bg-blue-500 text-white"
                        } ${
                          !isOptionSelected &&
                          pollSelections[pollIndex] === undefined &&
                          "hover:bg-blue-600"
                        }`}
                        onClick={() =>
                          handleOptionSelect(pollIndex, optionIndex)
                        }
                        disabled={pollSelections[pollIndex] !== undefined}
                      >
                        {option.option}{" "}
                        {pollSelections[pollIndex] !== undefined
                          ? `- ${percentage}%`
                          : ""}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })
      ) : (
        <p>No polls available.</p>
      )}
    </div>

    {isCreator && (
      <>
        {!isAddingPoll && (
          <button
            onClick={() => setIsAddingPoll(true)}
            class="bg-blue-500 text-white px-4 py-2 mt-4 rounded-lg hover:bg-blue-600 transition"
          >
            Add Poll
          </button>
        )}

        {isAddingPoll && (
          <div class="mt-4">
            <input
              type="text"
              placeholder="Poll Question"
              value={newPoll.question}
              onInput={(e) =>
                setNewPoll({ ...newPoll, question: e.target.value })
              }
              class="w-full p-2 border border-gray-300 rounded-lg mb-2"
            />
            {newPoll.options.map((option, index) => (
              <input
                key={index}
                type="text"
                placeholder={`Option ${index + 1}`}
                value={option}
                onInput={(e) =>
                  setNewPoll({
                    ...newPoll,
                    options: newPoll.options.map((opt, i) =>
                      i === index ? e.target.value : opt
                    ),
                  })
                }
                class="w-full p-2 border border-gray-300 rounded-lg mb-2"
              />
            ))}
            <div class="flex justify-between">
              <button
                onClick={handleSavePoll}
                class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
              >
                Save Poll
              </button>
              <button
                onClick={() => setIsAddingPoll(false)}
                class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </>
    )}
  </div>
);

export default LivePollsHTML;
