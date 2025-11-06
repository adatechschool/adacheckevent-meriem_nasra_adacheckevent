import { useState, useMemo } from "react";
import { AffDesc } from "./components/AffDesc.jsx";
import { useFetchEvents } from "./hooks/usefetchevents.jsx";
import { ArrowDownNarrowWide, ArrowUpNarrowWide } from "lucide-react";
import Dark from "./components/dark.jsx";


function App() {
  const { events, loading } = useFetchEvents();
  const [searchBar, setSearchBar] = useState("");
  const [dateOrder, setDateOrder] = useState("desc");

  const filteredEvents = useMemo(() => {
    return events
      .filter((event) => {
        if (!searchBar) return true;
        return (
          event.title?.toLowerCase().includes(searchBar.toLowerCase()) ||
          event.name?.toLowerCase().includes(searchBar.toLowerCase()) ||
          event.titre_fr?.toLowerCase().includes(searchBar.toLowerCase())
        );
      })
      .sort((a, b) => {
        const dateA = new Date(a.updated_at);
        const dateB = new Date(b.updated_at);
        return dateOrder === "asc" ? dateA - dateB : dateB - dateA;
      });
  }, [events, searchBar, dateOrder]);

  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white transition-colors p-10 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between mb-4 items-center gap-4">
        <input
          type="text"
          placeholder="🔍 Rechercher un évènement"
          value={searchBar}
          onChange={(e) => setSearchBar(e.target.value)}
          className="border p-2 w-full md:w-1/2 rounded bg-white dark:bg-gray-800 dark:text-white transition-colors"
        />

        <div className="flex items-center gap-2">
          <button
            onClick={() => setDateOrder(dateOrder === "asc" ? "desc" : "asc")}
            className="px-4 py-2 border rounded bg-gray-200 text-black dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            {dateOrder === "asc" ? <ArrowDownNarrowWide /> : <ArrowUpNarrowWide />}
          </button>

          <Dark />
        </div>
      </div>

      <AffDesc value={filteredEvents} loading={loading} />
    </div>
  );
}

export default App;
