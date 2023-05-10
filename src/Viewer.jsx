import React,{ useState,useEffect,useRef} from 'react'
import { Stage, Layer, Text, Rect, Group } from 'react-konva';
import { set } from './idb_utils';

function Viewer({data,size}) {
  
    const [wallData, setwallData] = useState([]);
    const stageRef = useRef();
     const handleDrag=(id)=>{
      let tempwall=wallData.map(item=>item.id===id?{...item,isDragging:true}:item)
      setwallData(tempwall)
     }
     const updatePos=(e,id)=>{
      if((e.target.x()<size.width&&e.target.x()>0)&&(e.target.y()<size.height&&e.target.y()>0)) {
        let tempwall=wallData.map(item=>item.id===id?{...item,isDragging:false,x: e.target.x(), y: e.target.y()}:item)
        let tempitem=tempwall.filter(item=>item.id===id)
        set(...tempitem)
        setwallData(tempwall)
      }
      let tempwall=wallData.map(item=>item.id===id?{...item,isDragging:false}:item)
      setwallData(tempwall)
     }
     useEffect(() => {
      setwallData(data)
     }, [data])

     const scaleBy = 1.2;
     const  zoomStage=(event)=> {
      if (stageRef.current !== null) {
        const stage = stageRef.current;
        const oldScale = stage.scaleX();
        const { x: pointerX, y: pointerY } = stage.getPointerPosition();
        const mousePointTo = {
          x: (pointerX - stage.x()) / oldScale,
          y: (pointerY - stage.y()) / oldScale,
        };
        const newScale = event.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;
        stage.scale({ x: newScale, y: newScale });
        const newPos = {
          x: pointerX - mousePointTo.x * newScale,
          y: pointerY - mousePointTo.y * newScale,
        }
        stage.position(newPos);
        stage.batchDraw();
      }
    }
  return (
    <>
    <Stage ref={stageRef} onWheel={zoomStage} width={size.width} height={size.height} draggable >
    <Layer>
      { console.log(wallData)}
     {wallData.map(item=>
     <Group 
     onDragStart={()=>handleDrag(item.id)}
     onDragEnd={(e)=>updatePos(e,item.id)}
     fill={item.isDragging ? 'green' : 'black'}
     x={item.x}
      y={item.y}
      draggable
     >
     <Rect width={150} height={150} fill='gray' stroke></Rect>
     <Text
      align='center'
      verticalAlign='middle'
      width={150}
      height={150}
      key={item.id}
      text={item.name}  
    />
     </Group>)}
      
    </Layer>
  </Stage>
  </>
  )
}

export default Viewer