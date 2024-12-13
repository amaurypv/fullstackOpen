
//para poder conectar con mongoose es necesario primero definirlo y descargarlo 
const mongoose=require('mongoose')
// se define que no se muestre en la consola la version de mongoose

//Se crea un esquema que define la estructura de los documentos en la colección "notes". Cada nota tendrá un campo content (texto) y un campo important (booleano).
const noteSchema = new mongoose.Schema({
    content: {
            type:String,
            required:true,
            minLength:5},
    important: Boolean,
    //se hace referencia ahora al usuario para que la nota sepa que usuario la creo y el usuario sepa que nota es
    user:{
          type:mongoose.Schema.Types.ObjectId,
          ref:'User'
          }
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