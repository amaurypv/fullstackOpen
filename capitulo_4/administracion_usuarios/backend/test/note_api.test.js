//se definen las variables test y after desde node:test
//se agrega beforeEach, que es lo que se tiene que hacer antes de cada prueba, se usa por lo general para borrar la base datos de prueba
const {test,after, beforeEach, describe}=require('node:test')
//se define mongoose ya que se van a hacer pruebas desde la base de datos. 
const mongoose=require('mongoose')
//se define la variable supertest que requiere la libreria supertest
const supertest=require('supertest')
//se define app que es el archivo app con el que hemos trabajado
const app=require('../app')
//se define la api desde supertest
const api=supertest(app)
//se define asserte desde node:assert
const assert=require('node:assert')
//se define la variable note para hacer uso de mongoose
const note = require('../models/note')
//se define la variable User para poder trabajar con mongoose en la base de datos de los usuarios
const Usuario=require('../models/usuarios')
//se va a usar bcrypt para las pruebas en los usuarios
const bcrypt=require('bcrypt')
//se importan las funciones helper para hacer mas sencillo el test
const {initialNotes,notasEnDb,sinId,usuariosEnDB}=require('./test_helper')
const User = require('../models/usuarios')
//se va a definir una nueva lista de notas
//se va a definir lo que se tiene que hacer antes de iniciar cualquier test. en este caso es eliminar todas las notas actuales en mongo en la bd testNoteApp
beforeEach(async()=>{
        //se elimina todas las notas de la coleccion
        await note.deleteMany({})
        //primero se crea una lista con los objetos de cada nota guardada 
        const objetosNotas =initialNotes.map(nota=> new note(nota))
        //se crea un nuevo array que consiste en promesas, que se crean llamando al método save de cada elemento en el array noteObjects
        const guardadas= objetosNotas.map(objeto=>objeto.save())
        //se crea un promiseAll() junto con await por ser una promesa que se ejecute cada una
        await Promise.all(guardadas)
    })

//se inicia el test La prueba importa la aplicación Express del módulo app.js y la envuelve con la función supertest en un objeto llamado superagent. 
test.only('las notas se envian como json',async()=>{
    await api.get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

//se agregan una prueba en la que se compruebe el numero de notas que hay 
test('se tienen 3 notas',async()=>{
    const response= await notasEnDb()
    assert.strictEqual(response.length,initialNotes.length)
})

// otra prueba para comprobar el contenido de la nota 
test('el contenido de la primer notas es',async()=>{
    const response=await notasEnDb()
    const content=response[0].content      
    assert.strictEqual(content,'HTML is easy')
})

//se crea un test para ver si funciona cuando se agrega una nota nueva
test('crear una nueva nota',async()=>{
    //primero se crea la nota
    let nuevaNota={
      content:'async y await ahorran mucho trabajo y se ve mas estetico',
      important:true  
    }
    //se agrega usando api.post ya que se definió en el api=supertest(app) con await
    await api
    .post('/api/notes')
    //se envia la nueva nota a la libreria PORQUE SE ENVIA A LA LIBRERIA COMO SEND?????
    //.send() se usa para enviar en Supertest()
    .send(nuevaNota)
    //si se agrega de forma correcta, envía un status 201 QUE PASA SI NO AGREGO .expect(201)???
    //se usa para verificar el codigo del estado http en este caso un request POST y cuando se envia de forma correcta el estatus es 201
    .expect(201)
    //y debe de enviar el json
    .expect('Content-Type', /application\/json/)
    //se crea una variable con las notas aunque ya se definió como async desde helper se tiene que hacer await para traer las notas
    const response= await notasEnDb()
    //se crea una variable content, que contenga solo el contenido de las notas
    //para poder acceder a los al contenido, es necesario obtener el .body
    const content=response.map(notas=>notas.content)
    //se revisa que la cantidad de las notas, sea el numero de las notas originales + 1
    assert.strictEqual(response.length,((initialNotes.length)+1))
    //se debe de comprobar que tambien contenga el content que se envió
    assert.strictEqual(content.includes('async y await ahorran mucho trabajo y se ve mas estetico'),true)
})

//crear una prueba que compruebe que no se pueden enviar notas sin content
test('no se puede enviar notas sin content',async()=>{
    //se define la nota sin el content
    let notaSinContent={
        important:true
    }
    //se envía usando api.post con await
    await api.post('/api/notes')
    //para enviar se usa .send(nota) por el supertest
    .send(notaSinContent)
    //como queremos que marque error tiene que enviar un status de 400
    .expect(400)
    //se comprueba que no se haya enviado, comparando el numero de notas inicial sea igual al numero de notas de mongo
    //primero se obtiene todo el    
    const notas=await notasEnDb()
    //se hace el assert para comparar el numero de notas
    assert.strictEqual(notas.length,initialNotes.length)
})

//hacer una prueba para ver si encuentra un contacto por su id
test('encontra contacto por id',async()=>{
    //primero se importan los contactos con notasendb y se guardan en una variable
    const notas= await notasEnDb()
    // y se guarda la primera en otra constante
    const primera=notas[0]
    //se buscar el contaco con api 
    const obtenerPorID=await api
    .get(`/api/notes/${primera.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)
    assert.deepStrictEqual(obtenerPorID.body,primera)  
})

//prueba para eliminar una nota individual
test('eliminar una nota',async()=>{
    //primero se importan las notas
    const notasInicial= await notasEnDb()
    //se selecciona la primera nota que es la que se va a eliminar
    const primeraNota=notasInicial[0]
    //se elimina la nota 
    await api
    .delete(`/api/notes/${primeraNota.id}`)
    .expect(204)
    //ahora se vuelve a llamar las notas en su estado actual
    const notasFinal=await notasEnDb()
    //se genera una lista con el contenido de las notas 
    const contenido=notasFinal.map(n=>n.content)
    //se hace la comparacion buscando que el contenido de las notas finales no tenga el contenido de la nota inicial que es la que se elimino
    assert.strictEqual(!contenido.includes(primeraNota.content),true)
})
//realizar una prueba en la que se agregue un nuevo usuario
//primero se realiza un describe
describe('agregar un nuevo usuario a la base de datos desde el principio',()=>{
    //Se define lo que se quiere hacer cada vez que se haga una prueba de usuarios 
    beforeEach(async()=>{
        //se borra la base de datos de usuarios
        await Usuario.deleteMany({})
        //como no se cuenta con una base de usuarios inicial se agregará uno
        const passwordHash=await bcrypt.hash('sekrey',10)
        const primerUsuario= new User({
            username: 'root',
            name: 'Superuser',
            passwordHash //para agregar el usuario como usualmente se agrega se tiene que haacer por medio de bcrypt en la que primero se pone await porque es una promesa y entre parentesis va el password, y luego el numeero de saltRound(10)
        })
        //se agrega el usuario de forma directa con mongoose.
        primerUsuario.save()
    })
    //una vez agregado el primer contacto, se va hacer el test y comprobar que si se haya agregado
    test('agregar un usuario',async()=>{
        //primero se guarda la lista de usuarios inicial
        const usuariosInicial= await usuariosEnDB()
        //se define un nuevo usuario
        //primero se define la contraseña
        const nuevoUsuario={
            username: 'roly',
            name: 'Sroo',
            password: 'salainen',}
        //se agrea el usuario a la base de datos de usuarios. para este caso, como se quiere probar que el metodo POST funcione de forma correcta, se va a agregar el usuario por medio de api.POST y no de forma directa por medio de mongoose con save() 
        await api.post('/api/users')
        .send(nuevoUsuario)
        .expect(201)
        //ahora se descarga la nueva lista de usuarios
        const usuariosActual=await usuariosEnDB()
        //se comprueba que la cantidad de usuarios actual sea igual a la inicial +1
        assert.strictEqual(usuariosActual.length,(usuariosInicial.length+1))
        //comprobar que si se haya guardado el usuario
        //primero se hace una variable con los username la lista de usuariosActual
        const usernames=usuariosActual.map(u=>u.username)
        //se comprueba si devuelve true la comparacion
        assert(usernames.includes(nuevoUsuario.username))
    })
    test('no acepta username repetido',async()=>{
        //se importa la base de datos actual
        const usuariosActual=await usuariosEnDB()
        //se genera un nuevo usuario con el mismo nombre del usuario existente en la base datos
        const nuevoUsuario={
            username:'root',
            name:'roy',
            password:'5523333',
        }
        //se agrega el usuario a la base de datos con api.post
        await api.post('/api/users')
        .send(nuevoUsuario)
        //normalmente daria un error 500, pero para que de 400, es necesario agregar un errorhandler en el middleware en el que haga referencia cuando error.name==='MongoServerError' envie el estatus(400)
        .expect(400)
        //se descarga la lista de usuarios actualizada 
        const usuariosNueva=await usuariosEnDB()
        //se hace la comparación que la lista nueva debe de tener el mismo numero de usuarios con la anterior
        assert.strictEqual(usuariosActual.length,usuariosNueva.length)
    })
})



after(async()=>{
    await mongoose.connection.close()
    })

/*para ejecutar el comando de pruebas de una por una se puede poner only.test al principio de cada prueba

para ejecutarlas es 
    npm test -- --test-only

para ejecutar un archivo se pone en terminal
    npm test -- test/note_api.test.js
 
o tambien por nombre de la prueba

     npm test -- --test-name-pattern="se tienen 3 notas" 
 
o puede tener solo una parte del nombre
     npm test -- --test-name-pattern="notas" 
*/