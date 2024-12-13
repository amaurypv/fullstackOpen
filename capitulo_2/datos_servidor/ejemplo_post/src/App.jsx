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


  const addNote=(event)=>{
    event.preventDefault()
    console.log('button clicked',event.target)
    const noteObject={
      content: newNote,
      important: Math.random()<0.5,
      // se va a eliminar el id
      // id: notes.length+1,
    }
    // se va ahora enviar la nueva nota al servidor mediate un post
    axios.post('http://localhost:3001/notes',noteObject)
      .then(response=>{
        console.log(response)
        console.log(response)
        // se agrega la nueva nota agregada al estado notes mediante el setNotes
        // pero se hara un concatenacion del estado notes con el response.data
        setNotes(notes.concat(response.data))
        SetNewNote('')
      })
  }

  const hook=()=>{
    axios.get('http://localhost:3001/notes')
    .then(response=>{
      console.log(`se han obtenido ${response.data.length} notas desde el servidor`)
      setNotes(response.data)
    })
  }
  useEffect(hook,[])

  // sincronice los cambios realizados en la entrada con el estado del componente:
  const handleNoteChange=(event)=>{
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
      <form onSubmit={addNote}> 
         <input value={newNote} onChange={handleNoteChange}/>
          <button type='submit'> save</button>
      </form>
    </div>
  )
}

export default App