import React, { useState } from "react";

export function AffDesc({ value, loading }) {
  const [textItems, setTextItems] = useState({}); // état par item
  const [page, setPage] = useState(1);

  const elempage = 12;  
  const limit = 95;    

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
{/* <div className="pt-4 mt-7 flex flex-wrap justify-center">
</div> */}

      <ul className="space-y-3">
        {curItems.map((item) => (
          <li key={item.id} className="flex flex-col md:flex-row items-start">
            
            {item.cover_url && (
              <img 
                src={item.cover_url} 
                alt={item.title} 
                className="rounded-2xl w-full md:w-52 h-56 object-cover mb-2"
              />
            )}

            <div className="p-4 flex-1">
            <strong className ="text-lg font-bold block mb-2">{item.title}</strong>
            <p className="mb-2 text-justify text-sm">{item.lead_text}</p>

            {item.description && (
              <div
              className="text-sm text-justify mb-2"
                dangerouslySetInnerHTML={{
                  __html: textItems[item.id]
                    ? item.description
                    : item.description.slice(0, limit) + "...",
                }}
              />
            )}

            {item.description && item.description.length > limit && (
              <div className="flex items-center gap-4 mb-2">
              <button onClick={() => toggleText(item.id)} 
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mb-2">
                {textItems[item.id] ? "Voir moins" : "Voir plus"}
              </button>
            
            <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mb-2" onClick={() => window.open(item.url)}> Lien</button>
            
            </div>
            )}

            {/* {item.url && (
              <p>
                🔗{""} 
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  {item.url}
                </a>
              </p> */}
            {/* )} */}
            </div>
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
