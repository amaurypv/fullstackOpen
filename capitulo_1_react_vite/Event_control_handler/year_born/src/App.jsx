const App = () => {
  const age=40
  return (
    <div>
      <Nacimiento age={age} />
    </div>
  )
}
// const Nacimiento = (props) => {
//   const yearBorn=()=>{
//     let actualYear=new Date().getFullYear()
//     return actualYear-props.age
//   }
//   return(
//   <>
//   <p>si tienes {props.age} años entonces naciste en el {yearBorn()-1900}</p>
//   </>
//   )
// }

//se puede hacer tambien con la destructuracion 
const Nacimiento=({age})=>{
  const bornYear = () => new Date().getFullYear() - age
  return(
    <>
    <p> si tienes {age} años entonces naciste en el año {bornYear()}</p>
    </>
  )
}

export default App