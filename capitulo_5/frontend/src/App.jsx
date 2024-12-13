
import Note from './components/Note'
import FormaUsuario from'./components/login'
import noteServices from './services/noteServices'
//se importa loginservices que contiene el servicio para hacer un post de login 
import loginServices from './services/loginServices'

import './index.css'
import { useState, useEffect } from 'react'


const App = (props) => {
  const [notes,setNotes]=useState([])
  const [newNote,SetNewNote]=useState('nueva nota ...')
  const [errorMessage, setErrorMEssage]=useState('')
  //se definen los estados de username y password para hacer una forma que guarde los estados de ambos
  const [formLogin,setFormLogin]=useState({username:'',password:''})
  //se define un estado para user en el que estado inicial sea null
  const [user,setUser]=useState(null)
  
  const [loginVisible,setLogingVisible]=useState(false)

  //se va a agregar un handle para hacer login 
  const handleLogin=async(event)=>{
    //se definen las variables dependiendo del caso por es que se pone {user,pass}=formLogin
    const {username,password}=formLogin
    event.preventDefault()
    // Si la conexión es exitosa, los campos de formulario se vacían y la respuesta del servidor (incluyendo un token y los datos del usuario) se guardan en el campo user del estado de la aplicación.
    try{
      //se toman las variables definidas desde el estado formLogin definidas antes
    const user= await loginServices.loginPost({username,password})
    //se van a guardar los datos del usuario(token,username,name)en el almacenamiento local del browser, usando window.localStorage.setItem(llave,valor) el valor en este caso como la variable user es un json, se tiene que convertir por lo que se tiene usar JSON.stringify(variable)
    window.localStorage.setItem('datosUsuario',JSON.stringify(user))
    noteServices.setToken(user.token)
    setUser(user)
    setFormLogin({username:'',password:''})
    }
    catch(exception){
      setErrorMEssage('no coincide el username y/o password')
      setTimeout(()=>{setErrorMEssage(null)},5000)
    }
  }
  //para poder obtener los datos del usuario conectado desde el local storage, se tiene que usar un useEffect(funcion,[]) el array vacio quiere decir que solo se va a ejecutar una vez la funcion hook que en este caso es para obtener los datos del usuario
  //Este código permite que la sesión d el usuario persista entre recargas de página o cierres del navegador. Cuando el componente se monta, useEffect revisa si ya hay un usuario almacenado en localStorage. Si encuentra uno, lo carga y configura el token de autenticación automáticamente, lo que mantiene al usuario autenticado sin requerir un nuevo inicio de sesión.
//para eliminar el usuario del almacenamiento se usara la consola con el siguiente codigo: window.localStorage.removeItem('loggedNoteappUser')
  useEffect(()=>{
    (()=>{
      //se obtiene el token desde el almacenamiento local
      const tokenStorage=window.localStorage.getItem('datosUsuario')
      //se hace una condicional, si se cuenta con el token obtenido se convierte el token a json y se define el estado usuario con la información del token obtenido y se da formato al token con a funcion setToken()
      if(tokenStorage){
        const user=JSON.parse(tokenStorage)
        setUser(user)
        noteServices.setToken(user.token)
      }
    },[])
  })
  

  //forma de usuario para posteriormente agregarse al frontend
  const formaNota=()=>{
    return(
    <form onSubmit={addNote}> 
    <input value={newNote} onChange={handleNoteChange}/>
    <button type='submit'> save note</button>
    </form>
    )
  }

  const handleChange=(event)=>{
    //se definen las variables name y value que son las variables del input, se toman como si fueran event.target.name y event.targe.value
    const {name,value}=event.target
    //se actualiza el estado solo cambiando la variable [name] la cual va variar dependien del name del input que en este caso puede ser username o password, por eso se tiene que poner [name] para que cambie su valor, y se usa ...prevData, para que solo cambie el valor definido, no los dos (username, password)
    setFormLogin(prevData=>({...prevData,[name]:value}))
  }

  const Footer=()=>{
    const footerStyle={
      color:'green',
      fontStyle:'italic',
      fontSize:'16'
    }
    return(
      <div style={footerStyle}>
        <br/> <em>este es un ejemplo de un footer en linea</em>
      </div>
    )
  }
  
  const Notificacion=({message})=>{
    if(message===null){
      return null
    }
    return(
      <div className='error'>
        {message}
      </div>
    )
  }

  const loginForm=()=>{
    //se usa display:none en un style dentro de un <div style={}>  para esconder lo que contiene el <div>
    const esconderConVisble={display:loginVisible?'none':''}
    const mostrarConVisible={display:loginVisible?'':'none'}
    
    return(
      <div>
        <div style={esconderConVisble}>
          <button onClick={()=>{setLogingVisible('none')}}>log in</button>
        </div>
        <div style={mostrarConVisible}>
          <FormaUsuario
          handleLogin={handleLogin}
          formLogin={formLogin}
          handleCHange={handleChange}/>
          <button onClick={()=>{setLogingVisible(false)}}>cancel</button>
        </div>
      </div>
    )
  }
  const addNote=(event)=>{
    event.preventDefault()
    console.log('button clicked',event.target)
    const noteObject={
      content: newNote,
      important: Math.random()<0.5,
      
    }

    noteServices.create(noteObject)
      .then(returnNote=>{
        setNotes(notes.concat(returnNote))
        SetNewNote('')
      })
  }

  const hook=()=>{
    noteServices.getAll()
    .then(initialNotes=>setNotes(initialNotes))
  }

  useEffect(hook,[])
  
  const cambiarImportancia=(id)=>{
    const note=notes.find(n=>n.id===id)
    const notaNueva={...note, important:!note.important}
    noteServices.update(id,notaNueva)
    .then(returnNote=>{
        const updatedNotes = notes.map(note => note.id !== id ? note : returnNote);
        setNotes(updatedNotes);  // Aquí se actualizaría el estado con la nueva lista de notas
        console.log(`se cambio la importancia del id ${returnNote.id} a ${returnNote.important}`)
      })
      .catch(error=>{
        setErrorMEssage(`Note ${error.content} ya no esta en el servidor`)
        setTimeout(()=>{
          setErrorMEssage(null)},5000)
        })
  }

  const eliminarNota=(id)=>{
    noteServices.eliminar(id).then(()=>
    //se ejecuta el .filter para tener una nueva lista sin el id elminado
    setNotes(notes.filter(note=>note.id!==id)))
  }

  const handleNoteChange=(event)=>{
    SetNewNote(event.target.value)
  }

  const cerrarSesion=()=>{
    window.localStorage.removeItem('datosUsuario')
    setUser(null)
  }
  
  return (
    <div>
      <h1>Notes</h1>
      <Notificacion message={errorMessage}/>
      {user===null?loginForm()
      :<div>
        <p>{user.name} ha iniciado sesion</p>
      {formaNota()}
      <button onClick={cerrarSesion}>log off</button>
      </div>}
      <ul>
        {notes.map(note => 
          <Note key={note.id} note={note} cambiarImportancia={()=>cambiarImportancia(note.id)} eliminarNota={()=>eliminarNota(note.id)} />
        )}
      </ul>
      <Footer/>
    </div>
  )
}

export default App