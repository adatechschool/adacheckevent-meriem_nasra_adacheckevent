import { useState } from 'react'
import { useEffect } from 'react'
import { AffDesc } from './components/AffDesc.jsx';


function App() {
  const [value, setValue] = useState([])
  const [searchBar, setSearchBar] = useState("")
  const [dateOrder, setDateOrder] = useState("desc")
  const [loading,setloading]=useState();
  const paris = async () =>{
    const res = await fetch('https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/que-faire-a-paris-/records?limit=100')
    const data = await res.json()
    console.log(data);
    setValue(data.results);
  }
  useEffect(() =>{
  paris()
  
  },[])
 const filterEvent = value
 .filter((event) =>
 event.title.toLowerCase().includes(searchBar.toLocaleLowerCase())
 )
.sort((a, b) =>{
  const dateAsc =  new Date(b.updated_at) 
  const dateDesc = new Date(a.updated_at)
  return dateOrder ==='asc' ? dateAsc - dateDesc : dateDesc - dateAsc

})



  return (
    <>
   
    <div className='p-10'>
      <div className=''>
      <input type='text'
      placeholder='Rechercher un évènement'
      class='w-60 px-4 py-2  border border-gray-400 rounded-lg mb-8'
      value={searchBar}
      onChange={(e) => setSearchBar(e.target.value)}
      />

      
      <button
          onClick={() => setDateOrder(dateOrder === 'asc' ? 'desc' : 'asc')}
          className="px-4 py-2 border border-gray-400 rounded-lg hover:bg-gray-100"
        >
          Trier{dateOrder === 'asc' ? '↓ Desc' : '↑ Asc'}
        </button>
      </div>
    
    <AffDesc value={filterEvent}  />
    
    </div>

    </>
)}

export default App
