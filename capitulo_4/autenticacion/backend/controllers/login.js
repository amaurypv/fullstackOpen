/*para generar un post de token
1.- primero se tiene que importar la libreria que anteriormente se descargo jsonwebtoken
2.-se descarga la libreria para encriptar password bcrypt
3.-se descarga el middleware de express Router() para los request
4.- se tiene que descargar el modelo mongoose de usuario para poder trabajar con los usuarios
5.- se define un request de POST en api/login
6.-se definen las variables username y password desde el cuerpo. 
7.- se define la variable usuario que contiene el valor del usuario que se buscó por el username usando User.findOne({username}) se tiene que usar await por ser una promesa
8.- se define una variable passwordCorrect que solo debe de contener false o true, en la cual compara primero si se encontró un usuario a partir de la busqueda del nombre de usuario 
9.- Si no se encuentra el usuario o la contraseña es incorrecta, se responde a la solicitud con el código de estado 401 unauthorized. El motivo del error se explica en el cuerpo de la respuest
10.- Si la contraseña es correcta, se crea un token con el método jwt.sign. El token contiene el nombre de usuario y la ID de usuario en un formato firmado digitalmente.
11.- La firma digital garantiza que solo las partes que conocen el secreto puedan generar un token válido. El valor de la variable de entorno debe establecerse en el archivo .env.SECRET. 
12.- se debe de definir la variable SECRET en el archivo .env de la sig manera: SECRET='secreto'
13.- Una solicitud exitosa se responde con el código de estado 200 OK. El token generado y el username del usuario se devuelven al cuerpo de la respuesta.
*/ 

const jwt=require('jsonwebtoken')
const bcrypt= require('bcrypt')
const loginRouter=require('express').Router()
const User=require('../models/usuarios')

loginRouter.post('/',async(req,res)=>{
    const {username,password}=req.body
    const usuario=await User.findOne({username})
    const passwordCorrect= usuario===null?
    false:await bcrypt.compare(password,usuario.passwordHash)

    if(!(usuario&&passwordCorrect)){
        return res.status(401).json({error:'usuario y/o password incorrecto'})
    }
    const userForToken={
        username:usuario.name,
        id:usuario._id,
    }
    const token=jwt.sign(userForToken,process.env.SECRET,{expiresIn:60*60}) //se pone {expiresIn:60*60} para que expire en 1 hora
    res.status(200)
    .send({token,username:usuario.username,name:usuario.name})
})

module.exports=loginRouter