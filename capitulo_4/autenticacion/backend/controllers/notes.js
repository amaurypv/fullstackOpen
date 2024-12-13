
//se importa jsonwebtoken
const jwt=require('jsonwebtoken')
const notesRouter=require('express').Router()
const Note=require('../models/note')
//se importa el modelo de users para poder trabajar con los usuarios
const User=require('../models/usuarios')
// El método .populate() en Mongoose se utiliza para rellenar (o "popular") campos que contienen referencias a documentos de otras colecciones. Esto permite que, en lugar de devolver solo los identificadores de los documentos referenciados, Mongoose devuelva los documentos completos o una selección de sus campos. 
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
//se creara una funcion que compruebe que se cuenta con un token y devuelva el token
const obtenerToken=req=>{
    const autorizacion=req.get('Authorization')
    if(autorizacion&&autorizacion.startsWith('Bearer ')){
        return autorizacion.replace('Bearer ','')
    }
    return null
}

notesRouter.post('/',async(req,res,next)=>{
    let cuerpo=req.body
    //se define una variable llamada tokenCodificado que va a verificar y decodificar el token para decodificar el token, se necesita la palabra SECRET que se definió en .env dando como resultado un objeto que contiene los siguientes datos. {id,username,iat (fecha de creacion),exp (fecha de expiracion)}
    const tokenCodificado=jwt.verify(obtenerToken(req),process.env.SECRET)
    //con la variable anterior, se comprueba si existe algun usuario relacionado con ese token, si no se cuenta con un id relacion a ese token se envia un error 401
    if(!tokenCodificado.id){
        return res.status(401).json({error:'token invalido'})
    }
    //se busca el usuario por el id de usuario que contiene el token codificado.
    const usuario=await User.findById(tokenCodificado.id)
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