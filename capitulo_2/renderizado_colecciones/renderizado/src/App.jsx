const App = ({notes}) => {
  
  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {/* es necesario poner un key dentro de la lista como atributo
        en este caso se pondra el id de la nota */}
      {notes.map(note => <li key={note.id}>{note.content}</li>)}
      </ul>
    </div>
  )
}

export default App