//se importa la funcion Note desde la carpeta components
import Note from './components/Note'
//se importa la funcion useState
import { useState, useEffect } from 'react'
import axios from 'axios'
//se agregará un formulario HMTL que se utilizará para agregr notas
const App = (props) => {
  const [notes,setNotes]=useState([])
  //se agrega un nuevo estado que se llame newNote para almacenar
  // la entrada enviada por el usuario 
  const [newNote,SetNewNote]=useState('nueva nota ...')


  //primero se genera una funcion llamada addNote que evento que se 
  //desencadena cuando un usuario realiza una acción 
  const addNote=(event)=>{
    // event.preventDefault() evita la acción predeterminada de enviar un formulario. 
    //La acción predeterminada, entre otras cosas, haría que la página se recargara.
    event.preventDefault()
    console.log('button clicked',event.target)
    const noteObject={
      content: newNote,
      important: Math.random()<0.5,
      id: notes.length+1,
    }
    setNotes(notes.concat(noteObject))
    SetNewNote('')
  }
  /* event.target es una referencia al elemento del DOM que disparó el evento. 
  Por ejemplo, si un usuario hace clic en un botón, event.target hará referencia a ese botón.

  event.target.value
  Cuando el event.target es un elemento de formulario (como un <input>, <textarea>, <select>, etc.),
  event.target.value contiene el valor actual de ese elemento.
  Esta propiedad es especialmente útil para obtener el valor de entrada del usuario.
  */

  // se van a obtener los datos de las notas desde el servidor que en este caso es db.json
  //se define una funcion que se va a utilizar mas adelante para un efecto 
  const hook=()=>{
    axios.get('http://localhost:3001/notes')
    .then(response=>{
      console.log(`se han obtenido ${response.data.length} notas desde el servidor`)
      // ahora se define el estado notes con las notas obtenidas desde el servidor
      setNotes(response.data)
    })
  }
  useEffect(hook,[])

  // sincronice los cambios realizados en la entrada con el estado del componente:
  const handleNoteChange=(event)=>{
    console.log(event.target.value)
    SetNewNote(event.target.value)
  }

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note => 
          <Note key={note.id} note={note} />
        )}
      </ul>
      {/* se añadira un formulario para agregar notas HTML */}
      <form onSubmit={addNote}> 
        {/* el valor del input se va a poner como el newNote */}
        {/* Cada vez que el usuario envíe el formulario (haciendo clic en el botón "Save"), se ejecutará la función addNote.
        value={newNote} Esto significa que el contenido del campo de entrada siempre reflejará el valor de newNote
        onChange={handleNoteChange} Cada vez que el usuario escriba algo en el campo de entrada, se ejecutará la función handleNoteChange.
        */}
          <input value={newNote} onChange={handleNoteChange}/>

        {/* type="submit": Este atributo especifica que el botón debe enviar el formulario cuando se hace clic en él. */}
          <button type='submit'> save</button>
      </form>
    </div>
  )
}

export default App