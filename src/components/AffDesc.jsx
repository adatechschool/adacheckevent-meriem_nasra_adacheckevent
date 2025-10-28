import React from "react"
import { useState } from "react";


export function AffDesc({min,setmin,value,loading,setloading}){
//   const [textAffiche, setTextAffiche] = useState(textAffiches)
// const limit = 130

// let textAffiches = value.description.slice(0,limit)


// setTextAffiche(value.description)
// textAffiche
// const HandClick = () => {

//   if(min) {
//     textAffiche = value.description.slice(0,limit)
//   }else {
//     textAffiche = value.description
//   }
  
//   };
//     if (loading) return <p>Loading...</p>;
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
                  __html: item.description,
                }}
              />
            )}
            {/* <button onClick={HandClick}>See More</button> */}

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
  
  </ul>
</>
)}





