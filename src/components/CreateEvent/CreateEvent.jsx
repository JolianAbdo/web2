// CreateEvent.js

import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import { route } from "preact-router";
import CreateEventHTML from "./CreateEvent.html.jsx"; // Import the HTML structure
import { fetchEvents } from "../../api/fetchEvents"; // Import the fetch events API
import { fetchUsers } from "../../api/fetchUsers"; // Import the fetch users API
import { addEvent } from "../../api/addEvent"; // Import the add event API
import { deleteEvent } from "../../api/deleteEvent"; // Import the delete event API

const CreateEvent = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [events, setEvents] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [calendarDays, setCalendarDays] = useState([]);
  const [selectedDayEvents, setSelectedDayEvents] = useState([]);
  const [showAttendeesSelection, setShowAttendeesSelection] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  const username = localStorage.getItem("loggedInUsername");

  // Format date to YYYY-MM-DD
  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  };

  // Initialize the component with events and users
  useEffect(() => {
    async function init() {
      try {
        const events = await fetchEvents(true); // Fetch events where the logged-in user is an attendee
        setEvents(events);
        generateCalendarDays(currentYear, currentMonth);
        const filteredUsers = await fetchUsers(); // Fetch all users
        setAllUsers(filteredUsers);
      } catch (error) {
        console.error("Error during initialization:", error);
      }
    }
    init();
  }, [currentMonth, currentYear]);

  // Generate calendar days for the selected month and year
  const generateCalendarDays = (year, month) => {
    const numDays = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const today = new Date();
    const isCurrentMonth = year === today.getFullYear() && month === today.getMonth();

    const calendarDays = Array.from({ length: firstDay }, () => null);

    for (let day = 1; day <= numDays; day++) {
      const fullDate = new Date(year, month, day);
      const formattedDate = formatDate(fullDate);
      const dayEvents = events.filter((event) => formatDate(event.date) === formattedDate);
      const isEvent = dayEvents.length > 0;
      const isUserInvolved = dayEvents.some((event) => event.attendees.includes(username));
      const isToday = isCurrentMonth && day === today.getDate();
      const isUnavailable = fullDate < today;

      calendarDays.push({
        day,
        isEvent,
        isUserInvolved,
        isToday,
        isUnavailable,
      });
    }

    setCalendarDays(calendarDays);
  };

  // Add a new event
  const handleAddEvent = async () => {
    const eventName = document.getElementById("eventName").value;
    const eventDate = document.getElementById("eventDate").value;
    const eventTime = document.getElementById("eventTime").value;

    if (!eventName || !eventDate || !eventTime) {
      alert("All fields are required");
      return;
    }

    try {
      await addEvent({
        name: eventName,
        details: "Placeholder for event details.",
        liveLink: "",
        creator: username,
        date: eventDate,
        time: eventTime,
        attendees: [username, ...selectedUsers],
      });

      resetFormAndStates();
      const updatedEvents = await fetchEvents(true);
      setEvents(updatedEvents);
      generateCalendarDays(currentYear, currentMonth);
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Failed to create the event, please try again");
    }
  };

  // Delete an event
  const handleDeleteEvent = async (eventId) => {
    console.log("Delete event triggered for ID:", eventId); // Debugging line
    try {
      await deleteEvent(eventId);
      const updatedEvents = await fetchEvents(true);
      setEvents(updatedEvents);
      generateCalendarDays(currentYear, currentMonth); // Regenerate the calendar after deletion
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("Failed to delete the event, please try again");
    }
  };

  // Handle user selection for event attendees
  const handleUserSelection = (userId) => {
    const user = allUsers.find((user) => user._id === userId);
    if (!user) return;

    setSelectedUsers((prevSelected) => {
      if (prevSelected.includes(user.username)) {
        return prevSelected.filter((username) => username !== user.username);
      } else {
        return [...prevSelected, user.username];
      }
    });
  };

  // Handle month navigation
  const handleMonthChange = (increment) => {
    setCurrentMonth((prevMonth) => {
      let newMonth = prevMonth + increment;
      if (newMonth < 0) {
        setCurrentYear((prevYear) => prevYear - 1);
        newMonth = 11;
      } else if (newMonth > 11) {
        setCurrentYear((prevYear) => prevYear + 1);
        newMonth = 0;
      }
      return newMonth;
    });
  };

  // Handle day click to view events on that day
  const handleDayClick = (day) => {
    if (day) {
      const fullDate = formatDate(new Date(currentYear, currentMonth, day));
      const dayEvents = events.filter((event) => formatDate(event.date) === fullDate);
      setSelectedDayEvents(dayEvents);
      setSelectedDate(fullDate);
    }
  };

  // Reset form fields and states after adding an event
  const resetFormAndStates = () => {
    document.getElementById("eventName").value = "";
    document.getElementById("eventDate").value = "";
    document.getElementById("eventTime").value = "";

    setSelectedUsers([]);
    setShowAttendeesSelection(false);
    setShowSuccessModal(true);
  };

  // Handle joining an event
  const handleJoinEvent = (eventId, eventName) => {
    localStorage.setItem("currentEventName", eventName);
    route(`/open-event/${eventId}`);
  };

  return CreateEventHTML({
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

  });
};

export default CreateEvent;
