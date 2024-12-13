import { useState } from 'react'

const App = () => {
  const [ counter, setCounter ] = useState(0)
  //para poner una accion sobre un boton
  //primero se define una funcion que es la que va a definir que accion se va a ejecutar
  //se va a definir que solo imprima en la consola que se hizo click
  //se usa la funcion que se importo de setCounter para que sume 1 cada vez que se hace click
  const sumarUno=()=>{
    setCounter(counter + 1)
  }
  const restarUno=()=>{
    setCounter(counter-1)
  }
  const reinciar=()=>{
    setCounter(0)
  }
  return (
    //en el cuerpo del html se va a insertar un elemento boton y dentro del boton 
    //se van a poner el evento del boton y que funcion se tiene que ejecutar al hacer onClick
    //se agrega un boton para reiniciar el contador pero en lugar de definir una funcion por fuera
    //se define la funcion dentro del boton
    <div>
      <Display counter={counter}/>
      {/* estos botones estaban definidos antes de crear el component Button 
      <button onClick={funcionBoton}>Click</button>
      <button onClick={()=>setCounter(0)}>reiniciar</button> */}
      <Button funcion={sumarUno} texto='sumar 1'/>
      <Button funcion={restarUno} texto='restar 1'/>
      <Button funcion={reinciar} texto='reiniciar'/>
    </div>
  )
}

//se va a definir una nueva funcion llamada display que contenga el counter
// const Display=(props)=>{
//   return(
//   <div>
//     {props.counter}
//   </div>
//   )
// }
//una manera mas simplificada de la funcion anterior es:
const Display=({counter})=><div>{counter}</div>

//tambien se va a definir un component Button para que se modifique con cada boton
//es importante recordar que se tienen que definir las funciones dentro de la funcion App()
// const Button=(props)=>{
//   return(
//     <div>
//       <button onClick={props.funcion}>{props.texto}</button>
//     </div>
//   )
// }
//de manera simplificada
const Button=({funcion,texto})=><div><button onClick={funcion}>{texto}</button></div>


export default App