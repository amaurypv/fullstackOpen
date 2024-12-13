import { useState } from 'react'
const App=()=>{
  //se definen valores cuando se haga click a izquiera o a derecha
  //se usan diferentes variables para un solo objeto useState()
  const[left, setLeft]=useState(0)
  const[right, setRight]=useState(0)
  //se va a agregar un contador que se ha hecho click sin importar si es izquierda o derecha
  const [clicks, setClicks]=useState(0)
  //se va a agregar un historial de el orden en que se ha hecho click
  const[history, setHistory]=useState([])
  // Se define la funcion que va a ejecutar el boton de izquierda
  const leftClick=()=>{
    setLeft(left+1)
    setHistory(history.concat('L'))
    //se actualiza setClick cada vez que se haga click en izquierda
    setClicks(clicks+1)
  }
  //se define la funcion que va a ejecutar el boton derecha
  const rightClick=()=>{
    setRight(right+1)
    setHistory(history.concat('R'))
    //se actualiza setClick cada vez que se haga click en izquierda
    setClicks(clicks+1)
  }
  
  const cero=()=>{
    setLeft(0)
    setRight(0)
    setHistory([])
    setClicks(0)
    console.log('reiniciando')
  }
  //poner un mensaje si no se tiene ningun registro de un click que mande un mensaje que se tiene que 
  //hacer click para que la app funcione
  const Mensaje=(props)=>{
    if(props.lista.length==0){
      return(
        <>
        <p>Tienes que hacer click sobre un boton</p>
        </>
      )
    }
    return(
      <>
      <p>{props.lista.join(',')}</p>
      </>
    )
  }

  // se hace un componente Boton que incluya las funciones y el texto
  const Boton=({funcion,texto})=>{
    return(
    <button onClick={funcion}>{texto}</button>
    )
  } 

  return(
    <div>
    {left}
    <Boton funcion={leftClick} texto='izquierda'/>
    <Boton funcion={rightClick} texto='derecha'/>
     {right}
    <Mensaje lista={history}/>
    <p>total de clicks {clicks}</p>
    <Boton funcion={cero} texto='reiniciar'/>
    </div>
    
  )
}


export default App
