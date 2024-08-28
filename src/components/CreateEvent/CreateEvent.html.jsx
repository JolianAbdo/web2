const monthNames = [
  "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",
];

// CreateEventHTML.js handles the rendering of the CreateEvent component.
const CreateEventHTML = ({
  showSuccessModal,
  calendarDays,
  selectedDayEvents,
  showAttendeesSelection,
  selectedDate,
  allUsers,
  selectedUsers,
  username,
  currentMonth,
  currentYear,
  handleAddEvent,
  handleDeleteEvent,
  handleUserSelection,
  handleMonthChange,
  handleDayClick,
  handleJoinEvent,
  resetFormAndStates,
  setShowSuccessModal,
  setShowAttendeesSelection,
  setSelectedDate,
  events,
  event,
}) => {
  return (
    <div class="bg-gray-100 dark:bg-slate-500 font-sans">
      {/* Success Modal */}
      {showSuccessModal && (
        <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div class="relative mx-auto p-5 border w-full max-w-sm sm:max-w-md shadow-lg rounded-md bg-white">
            <div class="mt-3 text-center">
              <h3 class="text-lg leading-6 font-medium text-gray-900">
                Event Added Successfully
              </h3>
              <div class="mt-2">
                <p class="text-sm text-gray-500">
                  Your event has been added to the calendar.
                </p>
              </div>
              <div class="mt-4">
                <button
                  onClick={() => setShowSuccessModal(false)}
                  class="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Layout */}
      <div class="container mx-auto px-4 py-8 flex flex-1 flex-col md:flex-row">
        {/* Event Creation Form */}
        <aside class="w-full md:w-1/3 mb-8 md:mb-0 md:pr-8">
          <h2 class="text-xl font-semibold text-black mb-4">
            Create New Event
          </h2>
          <div class="bg-white dark:bg-slate-700 p-6 rounded-md shadow-md">
            <div class="mb-4">
              <label
                class="block text-blue-600 font-medium mb-2"
                htmlFor="eventName"
              >
                Event Name
              </label>
              <input
                type="text"
                id="eventName"
                class="w-full px-3 py-2 border dark:bg-slate-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div class="mb-4">
              <label
                class="block text-blue-600 font-medium mb-2"
                htmlFor="eventDate"
              >
                Event Date
              </label>
              <input
                type="date"
                id="eventDate"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                class="w-full px-3 py-2 border dark:bg-slate-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div class="mb-4">
              <label
                class="block text-blue-600 font-medium mb-2"
                htmlFor="eventTime"
              >
                Event Time
              </label>
              <input
                type="time"
                id="eventTime"
                class="w-full px-3 py-2 border rounded-md focus:outline-none dark:bg-slate-300 focus:ring focus:border-blue-300"
              />
            </div>
            <div class="mb-4">
              <button
                class="px-4 py-2 bg-gray-500 text-gray-800 rounded-md w-full"
                onClick={() =>
                  setShowAttendeesSelection(!showAttendeesSelection)
                }
              >
                {showAttendeesSelection ? "Hide" : "Add"} Attendees
              </button>
              {showAttendeesSelection && (
                <div class="mt-4">
                  <ul class="space-y-2">
                    {allUsers.map((user) => (
                      <li key={user._id}>
                        <label class="flex items-center">
                          <input
                            type="checkbox"
                            value={user.username}
                            checked={
                              user.username ===
                                localStorage.getItem("loggedInUsername") ||
                              selectedUsers.includes(user.username)
                            }
                            onChange={() => handleUserSelection(user._id)}
                            class="form-checkbox h-5 w-5 text-blue-600"
                            disabled={
                              user.username ===
                              localStorage.getItem("loggedInUsername")
                            } // Disable checkbox if it's the logged-in user
                          />
                          <span class="ml-2 text-blue-500">
                            {user.username}{" "}
                            {user.username ===
                              localStorage.getItem("loggedInUsername") &&
                              "(Creator)"}
                          </span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <button
              onClick={handleAddEvent}
              class="px-4 py-2 bg-blue-600 text-white rounded-md w-full"
            >
              Add Event
            </button>
          </div>
        </aside>

        {/* Calendar and Events */}
        <main class="flex-1">
          {/* Calendar Controls */}
          <div class="flex items-center justify-between mb-6">
            <button
              onClick={() => handleMonthChange(-1)}
              class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
            >
              Previous
            </button>
            <h2 class="text-xl font-semibold text-gray-800">
              {monthNames[currentMonth]} {currentYear}
            </h2>
            <button
              onClick={() => handleMonthChange(1)}
              class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
            >
              Next
            </button>
          </div>

          {/* Calendar Grid */}
          <div class="grid grid-cols-7 gap-2 sm:gap-4">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} class="text-center font-semibold text-gray-700">
                {day}
              </div>
            ))}
            {calendarDays.map((dayObj, index) => (
              <div
                key={index}
                class={`h-16 sm:h-20 border rounded-md flex items-center justify-center ${
                  dayObj?.isEvent ? "bg-blue-100" : ""
                } ${
                  dayObj?.isUserInvolved ? "border-blue-500" : "border-gray-300"
                } ${dayObj?.isToday ? "bg-red-100 border-red-500" : ""} ${
                  dayObj?.isUnavailable && !dayObj?.isToday
                    ? "cursor-not-allowed text-gray-400"
                    : "cursor-pointer"
                }`}
                onClick={() =>
                  !dayObj?.isUnavailable && handleDayClick(dayObj?.day)
                }
              >
                {dayObj?.day || ""}
              </div>
            ))}
          </div>

          {/* Events on Selected Day */}
          {selectedDayEvents.length > 0 && (
            <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
              <div class="relative mx-auto p-5 border w-full max-w-sm sm:max-w-md shadow-lg rounded-md bg-white">
                <h3 class="text-lg font-semibold mb-4">
                  Events on{" "}
                  {selectedDayEvents[0] &&
                    new Date(selectedDayEvents[0].date).toLocaleDateString()}
                </h3>
                <ul class="space-y-4">
                  {selectedDayEvents.map((event) => (
                    <li
                      key={event._id}
                      class="bg-gray-100 p-4 rounded-md shadow"
                    >
                      <h4 class="text-md font-semibold">{event.name}</h4>
                      <p class="text-sm text-gray-600">Time: {event.time}</p>
                      <p class="text-sm text-gray-600">
                        Creator: {event.creator}
                      </p>
                      <div class="flex space-x-2 mt-2">
                        <button
                          onClick={() => handleJoinEvent(event.id, event.name)}
                          class="px-3 py-1 bg-green-500 text-white rounded-md"
                        >
                          Join
                        </button>
                        {event.creator === username && (
                          <button
                            onClick={() => handleDeleteEvent(event.id)}
                            class="px-3 py-1 bg-red-500 text-white rounded-md"
                          >
                            Delete
                          </button>
                        )}{" "}
                      </div>
                    </li>
                  ))}
                </ul>
                <div class="mt-4 text-right">
                  <button
                    onClick={() => setSelectedDayEvents([])}
                    class="px-4 py-2 bg-blue-600 text-white rounded-md"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* My Events Hub */}
          <h2 class="text-xl font-semibold text-gray-800 mb-4">
            My Events Hub
          </h2>
          <ul class="space-y-4">
            {events.map((event) => (
              <li
                key={event._id}
                class="bg-white p-4 rounded-md dark:bg-slate-300 shadow-md"
              >
                <h4 class="text-md font-semibold">{event.name}</h4>
                <p class="text-sm text-gray-600">
                  Date: {new Date(event.date).toLocaleDateString()}
                </p>
                <p class="text-sm text-gray-600">Time: {event.time}</p>
                <p class="text-sm text-gray-600">Creator: {event.creator}</p>
                <div class="flex space-x-2 mt-2">
                  <button
                    onClick={() => handleJoinEvent(event.id, event.name)}
                    class="px-3 py-1 bg-green-500 text-white rounded-md"
                  >
                    Join
                  </button>
                  {event.creator === username && (
                    <button
                      onClick={() => handleDeleteEvent(event.id)}
                      class="px-3 py-1 bg-red-500 text-white rounded-md"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </main>
      </div>
    </div>
  );
};

export default CreateEventHTML;
