const mongoose=require('mongoose')

const userSchema= new mongoose.Schema({
    username:{type:String,
              required:true, //se asegura que deba de haber un username
              unique:true }, //con unique, se asegura que no habrá otro usuario igual 
    name:String,
    passwordHash:String,
    notes:[
        { //Los identificadores de las notas se almacenan dentro del documento del usuario como una matriz de IDs de Mongo.
            type:mongoose.Schema.Types.ObjectId,
            ref:'Note'
        }
    ]
})
// que devuelva la búsqueda en formato JSON
userSchema.set('toJSON',
{ //convertir el _id en id en string
  transform:(document,returnedObject)=>{
    returnedObject.id=returnedObject._id.toString()
    //datos que no quiero que aparezcan al hacer una búsqueda
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }  
})

const User=mongoose.model('User',userSchema)

module.exports=User