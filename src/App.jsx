import { useState } from 'react'
import { useEffect } from 'react'
import { AffDesc } from './components/AffDesc.jsx';


function App() {
  const [value, setValue] = useState([])
  const [searchBar, setSearchBar] = useState("")
  const [loading,setloading]=useState();
  const paris = async () =>{
    const res = await fetch('https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/que-faire-a-paris-/records?limit=20')
    const data = await res.json()
    console.log(data);
    setValue(data.results);
  }
  useEffect(() =>{
  paris()
  
  },[])
 const filterEvent = value.filter((event) =>
 event.title.toLowerCase().includes(searchBar.toLocaleLowerCase()))
  return (
    <>
    <div>
      
      <input type='text'
      placeholder='Rechercher un évènement'
      value={searchBar}
      onChange={(e) => setSearchBar(e.target.value)}
      />
    
    <AffDesc value={filterEvent}  />
    
    </div>

    </>
)}

export default App
