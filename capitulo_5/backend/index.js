//se importa config que se encuentra en la carpeta utils y se sustiuye PORT
const app=require('./app')
const config=require('./utils/config')
const logger=require('./utils/logger')

//se ejecuta que xpress pueda ser accesible en todas las interfaces de la red
app.listen(config.PORT,'0.0.0.0',()=>{
  logger.info(`corriendo en el puerto ${config.PORT}`)
})
