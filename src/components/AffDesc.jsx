import React, { useState } from "react";

export function AffDesc({ value, loading }) {
  const [textItems, setTextItems] = useState({}); // état par item
  const [page, setPage] = useState(1);

  const elempage = 15;  
  const limit = 120;    

  const toggleText = (id) => {
    setTextItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Pagination
  const startIdx = (page - 1) * elempage;
  const curItems = value.slice(startIdx, startIdx + elempage);
  const totalPages = Math.ceil(value.length / elempage);

  const nextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <ul>
        {curItems.map((item) => (
          <li key={item.id}>
            {item.cover_url && (
              <img 
                src={item.cover_url} 
                alt={item.title} 
                style={{ maxWidth: "100%", marginBottom: "10px" }}
              />
            )}

            <strong>{item.title}</strong>
            <p>{item.lead_text}</p>

            {item.description && (
              <div
                dangerouslySetInnerHTML={{
                  __html: textItems[item.id]
                    ? item.description
                    : item.description.slice(0, limit) + "...",
                }}
              />
            )}

            {item.description && item.description.length > limit && (
              <button onClick={() => toggleText(item.id)}>
                {textItems[item.id] ? "Voir moins" : "Voir plus"}
              </button>
            )}

            {item.url && (
              <p>
                🔗{" "}
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  {item.url}
                </a>
              </p>
            )}
          </li>
        ))}
      </ul>

      {/* Pagination */}
      {value.length > elempage && (
        <div>
          <button onClick={prevPage} disabled={page === 1}>
            Précédent
          </button>
          <span>
            Page {page} / {totalPages}
          </span>
          <button onClick={nextPage} disabled={page === totalPages}>
            Suivant
          </button>
        </div>
      )}

      {value.length === 0 && <p>Aucun évènement trouvé</p>}
    </>
  );
}
