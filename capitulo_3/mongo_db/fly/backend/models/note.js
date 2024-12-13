
//para poder conectar con mongoose es necesario primero definirlo y descargarlo 
const mongoose=require('mongoose')
// se define que no se muestre en la consola la version de mongoose

mongoose.set('strictQuery',false)

// para definir la contraseña y que no se guarde en github ni este a la vista. se va a generar un archivo que se llamara .env (sin nada antes del punto) y dentro del archivo se va a definir la variable MONGODB_PASSWORD=xxxx para que la contraseña la jale el archivo 
require('dotenv').config()
//y se define la URL que se toma desde mongo atlas en el archivo .env
const url=process.env.MONGODB_URI

//existe una forma mas segura en la que no se envian las variables contenidas en .env a fly se hace de la siguiente forma: en la terminal definir las variables MONGODB_URI                             
//flyctl secrets set MONGODB_URI="mongodb+srv://amaurypv:peva8408@pruebafullstack.mpbku.mongodb.net/noteApp?retryWrites=true&w=majority&appName=pruebafullstack"
// y para definir el puerto: fly secrets set PORT:3000
//se envia un mensaje que se esta conectando a la url 
//con esto ya no seria necesario incluso usar dotenv


console.log(`conectandose a mongo`)

//ahora se va a conectar a la base de datos de mongoose
mongoose.connect(url)
    .then(result=>{
        console.log(`estas conectado a Mongo db`)
    })
    .catch(error=>{
        console.log(`hubo un error al conectarse: ${error.message}`)
    })

//Se crea un esquema que define la estructura de los documentos en la colección "notes". Cada nota tendrá un campo content (texto) y un campo important (booleano).
const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
})

//se define un esquema para eliminar los id y las versiones como vienen en mongo para de esta forma cuando se llame a los elementos solo envie el contenido y la importanci. 
noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
})

//Se crea el modelo y se exporta  basado en el esquema anterior. Esto es lo que usas para interactuar con los datos en la base de datos. mongo db pone el modelo en plural para la coleccion en este caso se llamará "notes" con minuscula y "s" al final
module.exports=mongoose.model('Note', noteSchema)