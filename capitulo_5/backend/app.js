//se importa la libreria express-async-errors para eliminar los bloques try{}catch{}
require('express-async-errors')
const config=require('./utils/config')
const express=require('express')
const app=express()
const cors=require('cors')
const logger=require('./utils/logger')
const middelware=require('./utils/middleware')
const notesRouter=require('./controllers/notes')
const loginRouter=require('./controllers/login')
const userRouter=require('./controllers/users')
const mongoose=require('mongoose')


mongoose.set('strictQuery',false)
logger.info('conectando con mongo')

mongoose.connect(config.MONGODB_URI)
    .then(()=>{
        logger.info(`estas conectado a ${config.MONGODB_URI} `)
    })
    .catch(error=>{logger.error(`error al conectar ${error.message}`)
    })

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(middelware.requestLogger)
app.use('/api/notes',notesRouter)
app.use('/api/login',loginRouter)
app.use('/api/users',userRouter)


app.use(middelware.endpointDesconocido)
app.use(middelware.errorHandler)

module.exports=app