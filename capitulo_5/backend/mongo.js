//se importa la libreria mongoose y se define con la variable mongoose
const mongoose=require('mongoose')

//se revisa si al poner mongo.js en la terminal tambien se incluye el password
if (process.argv.length<2) {
    console.log('give password as argument')
    process.exit(1)
}

//se define el password, que se toma cuando se incluye en la terminal al ejecutar node mongo.js password
const password = process.argv[2]

//la url es la que se toma desde mongo atlas recordar que se tiene que cambiar el nombre de la libreria despues de de.net/nombrelibreria?
const url =
`mongodb+srv://amaurypv:${password}@pruebafullstack.mpbku.mongodb.net/testNoteApp?retryWrites=true&w=majority&appName=pruebafullstack`
mongoose.set('strictQuery',false) 

//con esta linea a la base de datos con atlas.
mongoose.connect(url)

//se define como van a ser los esquemas que contiene la libreria

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

//se define la nueva libreria que se va a llamar person aunque mongo siempre lo pone en plural, pero como se puede poner plural persons mongo lo pone de forma automatica "people".
const Note = mongoose.model('Note', noteSchema)

//para agregar un contacto se define a person como una clase
const note = new Note({
    content: process.argv[3], //se toma la info que se pone despues de node mongo.js password "name" number de la terminal
    important: process.argv[4], //se toma la info que se pone despues de node mongo.js password "name" number
})

//el ejercicio pide que si no se agrega ningun contacto imprima en la consola todos los elementos que contiene la libreria
if(process.argv.length===3){ //si solo se tiene node mongo.js (longitud 2) porque node es[0] y mongo.js es[1] por lo que node[0] mongo.js[1] password[2] name[3] number[4] aunque su length es 3 
  //se va a imprimir cada elemento de la libreria
  //primero se toma la libreria y se usa el find ({}) seguido de .then() porque es una promesa
  console.log(`imprimiendo agenda`)
  Note.find({}).then(
    respuesta=>{
        //el resultado va a ser una matriz, por lo que se va hacer un recorrido con .forEach 
        respuesta.forEach(note=>console.log(note)) //y se va a dar la indicacion de que imprima cada elemento que hay en la libreria
        //por ultimo se tiene que cerrar la conexion con mongo
        mongoose.connection.close()
      })
}else{
  //si se cuenta con mas de 3 elementos al momento de ejecutar el mongo.js en la terminal se pide que se guarde la info que se puso en la terminal usando person.save() y .then() porque es una promesa
  console.log(`guardando ${note.content} ${note.important} en la agenda`)  
  note.save().then(result => {
    console.log(note)
    mongoose.connection.close()}
    )
}

