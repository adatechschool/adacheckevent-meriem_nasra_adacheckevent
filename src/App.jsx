import { useState } from "react";
import { useFetchEvents } from "./hooks/usefetchevents.jsx";
import { AffDesc } from "./components/AffDesc.jsx";

function App() {
  const { events, loading } = useFetchEvents();
  const [searchBar, setSearchBar] = useState("");

  // 🔹 Recherche dynamique
  const filteredEvents = events.filter((f) =>
    f.title?.toLowerCase().includes(searchBar.toLowerCase())
  );

  const eventsToDisplay = searchBar.trim() ? filteredEvents : events;

  return (
    <div className="p-10 max-w-6xl mx-auto">
    
      <input
        type="text"
        placeholder="🔍 Rechercher un évènement"
        className="w-full md:w-96 px-4 py-2 border border-gray-400 rounded-lg mb-8 block mx-auto"
        value={searchBar}
        onChange={(e) => setSearchBar(e.target.value)}
      />

      <AffDesc value={eventsToDisplay} loading={loading} />
    </div>
  );
}

export default App;
