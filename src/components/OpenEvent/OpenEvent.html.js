import { h } from "preact";
import EventDetails from "./EventDetails/EventDetails";
import LiveVideo from "./LiveVideo/LiveVideo";
import LiveChat from "./LiveChat/LiveChat";
import LivePolls from "./LivePolls/LivePolls";
import QASessions from "./QASessions/QASessions";
import NetworkingOpportunities from "./NetworkingOpportunities/NetworkingOpportunities";


const OpenEventHTML = ({ event, isCreator, eventId, setEvent }) => (
  <div class="bg-gray-100 dark:bg-slate-600 font-sans leading-relaxed tracking-wide flex flex-col">
    <main class="container mx-auto p-6 flex-grow">
      {/* Event Details Component */}
      <EventDetails
        event={event}
        onEdit={setEvent}
        onDelete={() => route("/", true)}
        isCreator={isCreator}
        eventId={eventId}
      />

      {/* Live Video Component */}
      <LiveVideo event={event} isCreator={isCreator} />

      {/* Chat and Live Polls Section */}
      <section class="flex flex-col lg:flex-row bg-white dark:bg-slate-400 p-6 rounded-lg shadow-md mb-8">
        {/* Live Chat Component */}
        <LiveChat
          eventId={eventId}
          chatMessages={event?.chatHistory || []}
          username={localStorage.getItem("loggedInUsername") || "Guest"}
        />

        {/* Live Polls Component */}
        <LivePolls
          polls={event?.polls || []}
          isCreator={isCreator}
          eventId={eventId}
        />
      </section>

      {/* Q&A Sessions Component */}
      <QASessions
        qaSessions={event?.qaSessions || []}
        isCreator={isCreator}
        eventId={eventId}
      />

      {/* Networking Opportunities Component */}
      <NetworkingOpportunities
        opportunities={event?.networkingOpportunities || []}
        isCreator={isCreator}
        eventId={eventId}
      />
    </main>
  </div>
);

export default OpenEventHTML;
