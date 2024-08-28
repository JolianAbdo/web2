const NetworkingOpportunitiesHTML = ({
    opportunityList,
    isCreator,
    isAddingOpportunity,
    newOpportunity,
    setNewOpportunity,
    setIsAddingOpportunity,
    handleSaveOpportunity,
    handleDeleteOpportunity,
  }) => (
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
                onInput={(e) => setNewOpportunity({ ...newOpportunity, title: e.target.value })}
                class="w-full p-2 border border-gray-300 rounded-lg mb-2"
                placeholder="Opportunity Title"
              />
              <input
                type="text"
                value={newOpportunity.link}
                onInput={(e) => setNewOpportunity({ ...newOpportunity, link: e.target.value })}
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
  
  export default NetworkingOpportunitiesHTML;
  