require('dotenv').config()
const PORT= process.env.PORT
//se define la uri dependiendo del uso que se va a dar ya sea para test o para dev
const MONGODB_URI=process.env.NODE_ENV==='test' //pregunta si el NODE_ENV es para test
    ?process.env.TEST_MONGODB_URI //si es para test entonces se define una uri de mongodb para prueba
    :process.env.MONGODB_URI //si no, se define la uri para el mongo db de forma normal


module.exports={PORT,MONGODB_URI}
