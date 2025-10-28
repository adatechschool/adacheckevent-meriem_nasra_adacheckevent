import { useState } from 'react'
import { useEffect } from 'react'
import { AffDesc } from './components/AffDesc.jsx';

function App() {
  const [value, setValue] = useState([])
  const [min,setmin]=useState(130);
  const [loading, setLoading] = useState(true);
  const paris = async () =>{
    const res = await fetch('https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/que-faire-a-paris-/records?limit=20')
    const data = await res.json()
    console.log(data);
    setValue(data.results);
     setLoading(false);
  }
  useEffect(() =>{
  paris()
  
  },[])

  return (
    <>

    <AffDesc value={value}  />


    </>
)}

export default App
