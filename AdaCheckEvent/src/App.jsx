import { useState } from 'react'
import { useEffect } from 'react'


function App() {
  const [value, setValue] = useState([])
  const paris = async () =>{
    const res = await fetch('https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/que-faire-a-paris-/records?limit=20')
    const data = await res.json()
    console.log(data)

    setValue(data.results)
  }
  useEffect(() =>{
  paris()
  
  },[])

  return (
    <>
    <ul>
    {value.map((item) =>(

     <li key = {item.id}>
     <strong>{item.title}</strong> 
     <p>{item.lead_text}</p> 
     <img src ={item.cover_url}/>

       </li>
      ))}
  
  </ul>
    </>
  )
}

export default App
