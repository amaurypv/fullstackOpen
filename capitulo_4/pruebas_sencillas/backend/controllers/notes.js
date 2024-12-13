//Un objeto de enrutador es un instancia aislada de middleware y rutas. Puedes pensar en ella como una "mini-aplicación", capaz solo de realizar funciones de middleware y enrutamiento. Cada aplicación Express tiene un enrutador de aplicación incorporado 
//El enrutador es de hecho un middleware, que se puede utilizar para definir "rutas relacionadas" en un solo lugar, que normalmente se coloca en su propio módulo..

const notesRouter=require('express').Router()
const Note=require('../models/note')
//se van a definir todas las rutas para las notas. 
notesRouter.get('/',async (req,res,next)=>{
    const notas= await Note.find({})   
    res.json(notas)
})


notesRouter.get('/:id',async(req,res,next)=>{
    let id=req.params.id    
    Note.findById(id)
    .then(nota=>{
        if(nota){
            res.json(nota)
        }else{
            res.status(400).send('no se encuentra nota por id').end()
        }
    })
    . catch(error=>next(error))
})

notesRouter.post('/',(req,res,next)=>{
    let cuerpo=req.body
    let nuevaNota= new Note({
        content:cuerpo.content,
        important:cuerpo.important||false
    })
    nuevaNota.save()
    .then(nueva=>res.status(201).json(nueva))
    .catch(error=>next(error))
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

notesRouter.delete('/:id',(req,res,next)=>{
    let id=req.params.id
    Note.findByIdAndDelete(id)
    .then(()=>{
        res.status(204)})
    .catch(error=>next(error))    
})

// El módulo exporta el enrutador para que esté disponible para todos los consumidores del módulo.
module.exports=notesRouter