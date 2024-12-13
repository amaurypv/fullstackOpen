Estructura de la aplicación:
se creo una carpeta nueva llamada utils
    y dentro de se creo un archivo llamdo logger.js
    ahi se definen diferentes constants, como info y error 
    El logger tiene dos funciones, info para imprimir mensajes de registro normales y error para todos los mensajes de error.

Se crea en esa misma carpeta otro archivo llamado config.js y se definen las variables MONGODB_URI y PORT y se exportan. Para este archivo tmb se requiere dotenv.config()
y se exporta el modulo, por lo que tambien se tiene que requerir en el backend como 
const config=require('./utils/config')

deben de quedar los siguientes archivos
├── index.js  se ejecuta la app (del archivo app.js)
├── app.js  //se llaman todos los middleware y se hace la conexion con mongo, se define la ruta  
             base de notesRouter (/api/....., notesRouter) 
├── dist //la carpeta se pega al hacer npm run build en el frontend
│   └── ...
├── controllers
│   └── notes.js //se escriben todos los request y se define el router require('expres').Router() 
├── models
│   └── note.js //se define el modelo del esquema de mongo y se exporta como 
                  module.exports=mongoose.model('nombre de coleccion', noteSchema)
├── package-lock.json
├── package.json
├── utils
│   ├── config.js //se ponen la url y el port desde require('dotenv').config()
│   ├── for_testing.js //se agregan funciones reverse(string) y average(array) para hacer el test
│   ├── logger.js //se ponen los console.log se cambian  const info=(...params)=>{
                   console.log(...params)}
│   └── middleware.js  //se ponen los middleware que se han definido 

se tiene que agregar en package.json la parte de test: "node --test"
se tiene que crear una nueva carpta llamada test
se crea el archivo reverse.test.js
├── test
│    ├── reverse.test.js

se tiene que modificar el package.json para cuando se quiera tener modo developer, production
en el scrip: start spoe NODE_ENV=production, development o test dependiendo 
y se agregar al inicio de cada modalidad cross-env para que se pueda usar en cualquier medio, por lo que es necesario instalar cross-env npm install cross-env

ahora se puede definir las variables en este caso la uri de mongo ya sea para prueba o para development, desde el archivo config.js de utils

Instalaremos el paquete como una dependencia de desarrollo:
    npm install --save-dev supertest

se va a generar un archivo nuevo llamado note_api.test.js para poder revisar si la app que hemos generado envia archivos en modo json

para ejecutar el comando de pruebas de una por una se puede poner only.test al principio de cada prueba
 y para ejecutarlas es npm test -- --test-only

 para ejecutar un archivo se pone en terminal
    npm test -- test/note_api.test.js
 
 o tambien por nombre de la prueba

     npm test -- --test-name-pattern="se tienen 3 notas" 
 o puede tener solo una parte del nombre

     npm test -- --test-name-pattern="notas" 