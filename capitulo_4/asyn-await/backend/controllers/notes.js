//Un objeto de enrutador es un instancia aislada de middleware y rutas. Puedes pensar en ella como una "mini-aplicación", capaz solo de realizar funciones de middleware y enrutamiento. Cada aplicación Express tiene un enrutador de aplicación incorporado 
//El enrutador es de hecho un middleware, que se puede utilizar para definir "rutas relacionadas" en un solo lugar, que normalmente se coloca en su propio módulo..

const notesRouter=require('express').Router()
const Note=require('../models/note')
//se van a definir todas las rutas para las notas. 
notesRouter.get('/',async (req,res,next)=>{
    try{
    const notas= await Note.find({})   
    res.json(notas)
    }catch(exception){
        next(exception)
    }
})

notesRouter.get('/:id',async(req,res,next)=>{
    let id=req.params.id
    try{
    const nota=await Note.findById(id) 
        if(nota){
            res.status(200).json(nota)
        }else{
            res.status(400).send('no se encuentra nota por id').end()
        }
    }
    catch(exception){
        next(exception)
    }
})

//se va a a modificar la funcion usando async
notesRouter.post('/',async(req,res,next)=>{
    let cuerpo=req.body
    let nuevaNota= new Note({
        content:cuerpo.content,
        important:cuerpo.important||false
    })
    try{
    const nueva=await nuevaNota.save()
        res.status(201).json(nueva)
    } catch(exception){
        next(exception)
    }
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