import { useState } from 'react'
import Notes from './components/Note'

function App() {
  //usar .map para poner en que consiste cada parte y cuanto ejercicios tiene
  const course = 'Half Stack application development'
  const programas=[
    {id:1,part:'Fundamentals of React',exercises : 10},
    {id:2, part:'Using props to pass data', exercises :7},
    {id:3,part:'State of a component',exercises: 14}
  ] 
  return (
    <>
      <h1>{course}</h1>
      <ul>
        {programas.map(programa=>
        <li key={programa.id}>
          la parte {programa.part} tiene {programa.exercises} ejercicios
        </li>)}
      </ul>
      <h2>usando la funcion Note</h2>
        {/* es lo mismo solo que la parte key no va dentro de <li>
        si no que va cuando se define la funcion Note  */}
      <ul>
        {programas.map(programa=><Nota key={programa.id} programa={programa}/>)}
      </ul>
      <h2> ahora usando un componente importado desde la carpeta componentes</h2>
      <ul>
        {programas.map(programa=><Notes key={programa.id} programa={programa}/>)}
      </ul>
    </>
  )
}

//se puede hacer tambien una funcion que genere un lista 
const Nota=({programa})=>{
  return(  
    <li>la parte {programa.part} tiene {programa.exercises} ejercicios</li>
    )
}

export default App
