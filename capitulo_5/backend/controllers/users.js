// se importa bcrypt y se define como una variable para poder generar passwordhash
const bcrypt= require('bcrypt')
// se importa express con .Router para poder exportarlo como una ruta fija con un middleware
const userRouter=require('express').Router()
//se importa el modelo mongoose User para poder guardar el nuevo usuario
const User=require('../models/usuarios')

//se va a generar un Request post
userRouter.post('/',async(req,res)=>{
    const {username,name,password}=req.body
    const saltRounds=10
    const passwordHash=await bcrypt.hash(password,saltRounds)
    const usuarioNUevo= new User({
        username,
        name,
        passwordHash
    })
    const usuarioAgregado=await usuarioNUevo.save()
        res.status(201).json(usuarioAgregado)
})

userRouter.get('/',async(req,res)=>{
    //se agrega .popular('notes') para poder unir las notas por su id que hacen referencia a objetos note en el campo notes del documento user serán reemplazados por los documentos de note referenciados.
    const usuarios= await User.find({}).populate('notes',{content:1,important:1}) //Podemos usar el método populate para elegir los campos que queremos incluir de los documentos. Además del campo id, ahora solo nos interesan content e important.
    res.status(200).json(usuarios) 
})

module.exports=userRouter
