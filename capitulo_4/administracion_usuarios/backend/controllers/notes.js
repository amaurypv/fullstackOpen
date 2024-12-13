//Un objeto de enrutador es un instancia aislada de middleware y rutas. Puedes pensar en ella como una "mini-aplicación", capaz solo de realizar funciones de middleware y enrutamiento. Cada aplicación Express tiene un enrutador de aplicación incorporado 
//El enrutador es de hecho un middleware, que se puede utilizar para definir "rutas relacionadas" en un solo lugar, que normalmente se coloca en su propio módulo..

const notesRouter=require('express').Router()
const Note=require('../models/note')
//se importa el modelo de users para poder trabajar con los usuarios
const User=require('../models/usuarios')
//se van a definir todas las rutas para las notas. 
notesRouter.get('/',async (req,res,next)=>{
    const notas= await Note.find({}).populate('user',{name:1,username:1})
    res.json(notas)
})

notesRouter.get('/:id',async(req,res,next)=>{
    let id=req.params.id
    const nota=await Note.findById(id) 
        if(nota){
            res.status(200).json(nota)
        }else{
            res.status(404).send('no se encuentra nota por id').end()
        }
})

//se va a a modificar la funcion usando async
notesRouter.post('/',async(req,res,next)=>{
    //se define la variable cuerpo que el body del request
    let cuerpo=req.body
    //se busca el usuario por el id de usuario que se pone el cuerpo.
    const usuario=await User.findById(cuerpo.userId)
    //se crea la nueva nota a partir de la información del cuerpo del request
    let nuevaNota= new Note({
        content:cuerpo.content,
        important:cuerpo.important||false,
        user:usuario.id //se agrega el id del usario desde el cuerpo
    })
    //se agrega la nueva nota mongoose
    const nueva=await nuevaNota.save()
    //se actualiza la lista de id de las notas agregadas por el usuario
    usuario.notes = usuario.notes.concat(nueva._id)
    //se guarda el usuario actualizado
    await usuario.save()
    //se envia el status y el json de la nueva nota
    res.status(201).json(nueva)
})

notesRouter.put('/:id',(req,res,next)=>{
    let id=req.params.id
    let cuerpo=req.body
    let modificado={
        content: cuerpo.content,
        important:cuerpo.important
    }
    note.findByIdAndUpdate(id,modificado,{new:true})
    .then(modificada=>{
        res.json(modificada)
    })
    .catch(error=>next(error))
})

notesRouter.delete('/:id',async(req,res,next)=>{
    let id=req.params.id
    try{
        const borrar=await Note.findByIdAndDelete(id)
            res.status(204).end()
    }catch(exception){
        next(exception)
    }    
})

// El módulo exporta el enrutador para que esté disponible para todos los consumidores del módulo.
module.exports=notesRouter