//Se crea este archivo para crear funciones que ayuden a hacer los test 
//primero se importa Note de models para guardar las notas en mongo
const Note=require('../models/note')
//se importa los usuarios desde mongoose con el modelo User
const Users=require('../models/usuarios')
//se define una lista con las notas para las pruebas
const initialNotes = [
    {
      content: 'HTML is easy',
      important: false
    },
    {
      content: 'Browser can execute only JavaScript',
      important: true
    }
]

// primero se va a definir una funcion que guarde todas las notas de mongo
const notasEnDb=async()=>{
    //se bajan las notas de mongo con await y se guardan en una variable llamada notas 
    const notas=await Note.find({})
    //la funcion va a retornar las notas en formato json
    return notas.map(nota=>nota.toJSON())
}

const usuariosEnDB=async()=>{
  //se define una constante en la que se guardan todos los usuarios que hay en mongo
  const usuarios=await Users.find({})
  //se retornan los usuarios en una lista en formato json
  return usuarios.map(u=>u.toJSON())
}

//se. va a generar otra funcion que solo tenga id y se envie en forma de string
const sinId=async()=>{
    //se crea una nueva nota desde mongo con el formato new Note
    const nuevaNota=new Note({content:'sin id'})
    //se envia la nota a mongo
    await nuevaNota.save()
    //se elimina la nota 
    await nuevaNota.deleteOne()
    //la funcion envia el id en forma de string
    return nuevaNota._id.toString()
}

//se envian las variables
module.exports={initialNotes,notasEnDb,usuariosEnDB,sinId}