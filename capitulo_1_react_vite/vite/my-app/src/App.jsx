
//la funcion App se va a exportar para que el archivos main.jsx pueda importarla y renderizarla
const App=()=>{
  //se puede renderizar lo que se quiera incluso en la consola
  const a=10
  const b=20
  const ahora=new Date()
  let edad=40
  let nombre='amaury'
  //los valores que se quieran poner deben de ir entre corchetes {}
  //lo que queremos que se renderice debe de ir dentro del return 
  //y dentro del return debe de ir un <div> aunque a veces por exceso de elementos 
  //solo se puede poner <> y para cerrarlo </>
  return (
    <div>
      <h1> Que onda </h1> 
      <p> Hola {a}</p>
      <Hola nombre={nombre} edad={edad}/>
      <Hola nombre='diego' edad={2} />
      <Hola />
    </div>  
  )
}

const App2=()=>{
  const amigos=[{nombre:'juan', edad:3},{nombre:'pedro', edad:6}]
  return (
    <>
    <p>{amigos[0].nombre}, {amigos[0].edad}</p>
    <p>{amigos[1].nombre}, {amigos[1].edad}</p>
    </>
  )
}

// se pueden definir funciones que se pueden tomar los valores 
//por ejemplo se definió un nuevo elemento llamado <Hola /> en la funcion App 
//se pueden definir diferentes variables 
const Hola=(props)=>{
  console.log(props)
  return(
    <p>
      Hola mi nombre es {props.nombre} y tengo {props.edad} años  
    </p>
  )
}
//solo se puede exportar una funcion por defecto 
export default App
//para exportar mas de una funcion es necesario ponerla entre corchetes y para importarla en 
//otro archivo se tiene que importar con todo y corchetes
export {App2}