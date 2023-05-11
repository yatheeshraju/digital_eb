import { useState ,useEffect} from 'react';
import {set, getAll} from './idb_utils'
import './App.css';
import Viewer from './Viewer';


function App() {
  const [cardDetails, setcardDetails] = useState({})
  const [testwall, settestwall] = useState([]);
  const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;
  const handleAddCard=async ()=>{
    if(cardDetails.name!==""||cardDetails.name!==undefined||cardDetails.name!==null){
      set({"name":cardDetails.name,link:cardDetails.link,x:random(20,500),y:random(20,500),isDragging:false});
    }
    reloadData()
  }

  const handleInput =(e)=>{
    let value =e.target.value;
    let keyname = e.target.name;
    setcardDetails({...cardDetails,[keyname]:value})
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
      <input type='text' name='name' onChange={handleInput} />
       <br/> 
       Link to :
      <select onChange={handleInput} name='link'>
        <option> please select a card to link </option>
       {testwall.map((item)=><option key={item.id} value={item.id}>{item.name}</option>)}
      </select>
      <br/>
      <button onClick={handleAddCard}>Add Card</button>
      <hr/>
      {testwall.map((item)=><li key={item.id}>{item.name}</li>)}
      </div>
      <div className='viewer'>
      <Viewer  size={{width:(window.innerWidth/3)*2,height:window.innerHeight}}data={testwall}/>
      </div>
     
    </div>
  );
}

export default App;
