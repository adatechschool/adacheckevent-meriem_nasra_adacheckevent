import React, { useState } from "react";

export function AffDesc({ value, loading }) {
  const [expanded, setExpanded] = useState({});
  const [page, setPage] = useState(1);

  const itemsPerPage = 12;
  const descLimit = 95;

  const toggleText = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (loading) return <p className="text-center">Chargement...</p>;
  if (value.length === 0) return <p className="text-center">Aucun évènement trouvé</p>;

  const totalPages = Math.ceil(value.length / itemsPerPage);
  const start = (page - 1) * itemsPerPage;
  const current = value.slice(start, start + itemsPerPage);

  return (
    <div>
      <ul className="space-y-6">
        {current.map((item) => {
          const f = item; // 🔹 Les champs sont directement dans "item" maintenant
          const id = f.id;

          return (
            <li
              key={id}
              className="flex flex-col md:flex-row gap-4 border-b pb-4"
            >
              {f.cover_url && (
                <img
                  src={f.cover_url}
                  alt={f.title}
                  className="rounded-xl w-full md:w-52 h-56 object-cover"
                />
              )}

              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-2">{f.title}</h2>
                {f.lead_text && (
                  <p className="text-gray-600 mb-2">{f.lead_text}</p>
                )}

                {f.description && (
                  <div
                    className="text-sm text-justify mb-2"
                    dangerouslySetInnerHTML={{
                      __html: expanded[id]
                        ? f.description
                        : (f.description || "").slice(0, descLimit) + "...",
                    }}
                  />
                )}

                <div className="flex gap-3 mt-2">
                  {f.description && f.description.length > descLimit && (
                    <button
                      onClick={() => toggleText(id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      {expanded[id] ? "Voir moins" : "Voir plus"}
                    </button>
                  )}

                  {f.url && (
                    <button
                      onClick={() => window.open(f.url, "_blank")}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      Lien
                    </button>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Pagination */}
      {value.length > itemsPerPage && (
        <div className="flex items-center gap-4 justify-center mt-6">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Précédent
          </button>
          <span>
            Page {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Suivant
          </button>
        </div>
      )}
    </div>
  );
}
