import { useState ,useEffect} from 'react';
import {set, getAll} from './idb_utils'
import './App.css';
import Viewer from './Viewer';


function App() {
  const [addCard, setaddCard] = useState("")
  const [testwall, settestwall] = useState([]);
  const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;
  const handleAddCard=async ()=>{
    if(addCard!==""||addCard!==undefined||addCard!==null){
      set({"name":addCard,x:random(20,500),y:random(20,500),isDragging:false});
    }
    reloadData()
  }

  const reloadData= async()=>{
    await getAll().then(res=>settestwall(res))
  }

  useEffect(() => {
    getAll().then(res=>settestwall(res))
    
  }, [])
  
  return (
    <div className="app">
      <div className='editor'>
      <input type='text' onChange={(e)=>setaddCard(e.target.value)} />
      <button onClick={handleAddCard}>Add Card</button>
      {testwall.map((item)=><li key={item.id}>{item.name}</li>)}
      </div>
      <div className='viewer'>
      <Viewer  size={{width:1000,height:900}}data={testwall}/>
      </div>
     
    </div>
  );
}

export default App;
