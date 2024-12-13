para iniciar en Mongo, primero crear una cuenta en mongo atlas

crear un cluster
    crear un cluster que sea gratis
    seleccionar el proveedor de servicio (aws,azure, google cloud)
    para crear un cluster, pide la ubicacion del data center que te quede mas cerca
una vez creado se selecciona usuario y se crea un username y un pasword
en network access se tiene que poner acceder desde cualquier lugar. 

ahora se va a dar en connect       
    se elige connect your aplication 
    driver: Node js
    version: la mas nueva

nos va a dar un codigo grande que se tiene que copiar y mas adelante se va a pegar en vs
    mongodb+srv://fullstack:thepasswordishere@cluster0.o1opl.mongodb.net/?retryWrites=true&w=majority
en la parte de password, se va a poner el password que se eligio al crear el usuario para ese cluster

en vs se va a instalar la libreria mongoose en la raiz del backend
    npm install mongoose
se crea un archivo llamado mongo.js  y se pega lo siguiente:

    const mongoose = require('mongoose')

    if (process.argv.length<3) {
    console.log('give password as argument')
    process.exit(1)
    }

    const password = process.argv[2]

    const url =
    `mongodb+srv://fullstack:${password}@cluster0.o1opl.mongodb.net/?retryWrites=true&w=majority`

    mongoose.set('strictQuery',false)

    mongoose.connect(url)

    const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
    })

    const Note = mongoose.model('Note', noteSchema)

    const note = new Note({
    content: 'HTML is easy',
    important: true,
    })

    note.save().then(result => {
    console.log('note saved!')
    mongoose.connection.close()
    })

para ejecutar ese archivo y se pone en la terminal en la raiz del backend
    npm mongo.js peva8408 

para ver el contenido de la nueva base de datos se puede ver en BROWSE COLLECTIONS en atlas

CONECTAR MONGO CON BACKEND
para conectar mongo, es necesario descargar mongoose, definir el password y poner la url en el index del backend
    