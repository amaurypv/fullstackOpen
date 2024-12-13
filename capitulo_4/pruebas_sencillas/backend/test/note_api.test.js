//se definen las variables test y after desde node:test
//se agrega beforeEach, que es lo que se tiene que hacer antes de cada prueba, se usa por lo general para borrar la base datos de prueba
const {test,after, beforeEach}=require('node:test')
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
const note = require('../models/note')

//se va a definir una nueva lista de notas
const initialNotes=[
    {
        content: 'HTML is easy',
        important: false,
      },
      {
        content: 'Browser can execute only JavaScript',
        important: true,
      },
]
//se va a definir lo que se tiene que hacer antes de iniciar cualquier test. en este caso es eliminar todas las notas actuales en mongo en la bd testNoteApp
beforeEach(async()=>{
    //se elimina todas las notas de la coleccion
    await note.deleteMany({})
    //se define la primera nota nueva, apartir de la lista initialNotes
    let noteObject=new note(initialNotes[0])
    //se guarda la nueva nota en la libreria. 
    await noteObject.save()
    //se define la nota 2 de initialNotes
    noteObject=new note(initialNotes[1])
    //se guardar en la libreria
    await noteObject.save()
})

//se inicia el test La prueba importa la aplicación Express del módulo app.js y la envuelve con la función supertest en un objeto llamado superagent. 
test('las notas se envian como json',async()=>{
    await api.get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

//se agregan una prueba en la que se compruebe el numero de notas que hay 
test('se tienen 3 notas',async()=>{
    const response= await api.get('/api/notes')
    assert.strictEqual(response.body.length,initialNotes.length)
})

// otra prueba para comprobar el contenido de la nota 
test('el contenido de la primer notas es',async()=>{
    const response=await api.get('/api/notes')
    const content=response.body[0].content      
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
    //se crea una variable con las notas. 
    const response= await api.get('/api/notes')
    //se crea una variable content, que contenga solo el contenido de las notas
    //para poder acceder a los al contenido, es necesario obtener el .body
    const content=response.body.map(notas=>notas.content)
    //se revisa que la cantidad de las notas, sea el numero de las notas originales + 1
    assert.strictEqual(response.body.length,((initialNotes.length)+1))
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
    //primero se obtiene todo el get
    const response=await api.get('/api/notes')
    //se define una variable con las notas (body)
    const notas=response.body
    //se hace el assert para comparar el numero de notas
    assert.strictEqual(notas.length,initialNotes.length)
})


after(async()=>{
    await mongoose.connection.close()
    })

/*para ejecutar el comando de pruebas de una por una se puede poner only.test al principio de cada prueba
 y para ejecutarlas es npm test -- --test-only

 para ejecutar un archivo se pone en terminal
    npm test -- test/note_api.test.js
 
 o tambien por nombre de la prueba

     npm test -- --test-name-pattern="se tienen 3 notas" 
 o puede tener solo una parte del nombre

     npm test -- --test-name-pattern="notas" 
*/