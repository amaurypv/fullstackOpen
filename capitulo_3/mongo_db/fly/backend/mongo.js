//Se importa Mongoose, que es la herramienta que permite interactuar con MongoDB a través de objetos en JavaScript.
const mongoose = require('mongoose')

if (process.argv.length<3) {
    console.log('give password as argument')
    process.exit(1)
}
//Aquí se verifica que se haya pasado al menos un argumento desde la línea de comandos (en este caso, la contraseña). Si no es así, se muestra un mensaje pidiendo la contraseña y el programa se detiene con process.exit(1).

//Toma la contraseña que ingresas como argumento (el tercer valor en el arreglo process.argv).
const password = process.argv[2]


//CONEXION A MONGO
//Se forma la URL de conexión usando el usuario amaurypv y la contraseña ingresada. Esta URL se conecta a una base de datos MongoDB en la nube (MongoDB Atlas). El comando mongoose.set('strictQuery', false) desactiva las advertencias sobre las consultas estrictas en MongoDB, y luego, mongoose.connect(url) conecta tu aplicación a la base de datos.
//despues de .net/ se pone el nombre de la base de datos y un ? al final. en este caso se llamara noteApp
const url =
`mongodb+srv://amaurypv:${password}@pruebafullstack.mpbku.mongodb.net/noteApp?retryWrites=true&w=majority&appName=pruebafullstack`

mongoose.set('strictQuery',false)
mongoose.connect(url)

//Se crea un esquema que define la estructura de los documentos en la colección "notes". Cada nota tendrá un campo content (texto) y un campo important (booleano).
const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

//Se crea el modelo Note, basado en el esquema anterior. Esto es lo que usas para interactuar con los datos en la base de datos.
const Note = mongoose.model('Note', noteSchema)

//Aquí se crea una nueva instancia del modelo Note con un contenido específico (content: 'HTML is easy') y un valor booleano para indicar si es importante (important: true).
  const note = new Note({
  content: 'HTML is easy',
  important: true,
})


// Se guarda en la base de datos con note.save(). Cuando se completa la operación, se imprime un mensaje en la consola ("note saved!") y se cierra la conexión a la base de datos con mongoose.connection.close().
note.save().then(result => {
    console.log('note saved!')
    mongoose.connection.close()
})
