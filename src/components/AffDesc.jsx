import React from "react"
import { useState } from "react";


export function AffDesc({value}){

  const [text,settext]=useState(false);
  const limit=120;
  const HandClick=()=>{
    settext(!text);
  }

return(
    <>
    <ul>
    {value.map((item) =>(

     <li key = {item.id}>
     <strong>{item.title}</strong> 
     <p>{item.lead_text}</p>
    
      
   
   {item.description&& (
              <div
                dangerouslySetInnerHTML={{
                  __html: text
                   ? item.description
                  : item.description.slice(0, limit) + "...",
              }}
              />
            )}
               {item.description && item.description.length > limit && (
            <button onClick={HandClick}>
              {text ? "Voir moins" : "Voir plus"}
            </button>
          )}
            {item.url && (
              <p>
                🔗{' '}
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.url}
                </a>

              </p>
            )}
     <img src ={item.cover_url}/>

       </li>
      ))}
  {value.length === 0 && <p>Aucun évènement trouvé</p> }
  </ul>
</>
)}
