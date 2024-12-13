Queremos agregar autenticación y autorización de usuarios a nuestra aplicación. Los usuarios deben almacenarse en la base de datos y cada nota debe estar vinculada al usuario que la creó. La eliminación y edición de una nota solo debe permitirse para el usuario que la creó.

hay varias formas de relacionar la base usuarios con la base notas, sin embargo sería mas facil llevar a cabo esto con modelos relacionales como sql, sin embargo para mongoose se va a realizar la relación de la siguiente manera.
[
  {
    username: 'mluukkai',
    _id: 123456,
    notes: [221212, 221255],
  },
  {
    username: 'hellas',
    _id: 141414,
    notes: [221244],
  },
]
lo que esta en corchetes es el id de la nota 
por lo que en la carpeta models se va a crear una base de datos para usuarios en la que el modelo sea como el de los elementos anteriores. 
    const userSchema= new mongoose.Schema({
        username:String,
        name:String,
        passwordHash:String,
        notes:[
            { //Los identificadores de las notas se almacenan dentro del documento del usuario como una matriz de IDs de Mongo.
                type:mongoose.Schema.Types.ObjectId,
                ref:'Note'
            }
        ]
    })

    // que devuelva la búsqueda en formato JSON
    userSchema.set('toJSON',
    { //convertir el _id en id en string
    transform:(document,returnedObject)=>{
        returnedObject.id=returnedObject._id.toString()
        //datos que no quiero que aparezcan al hacer una búsqueda
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }  
    })

    const User=mongoose.model('User',userSchema)

El hash de la contraseña es el resultado de una función hash unidireccional aplicada a la contraseña del usuario. ¡Nunca es aconsejable almacenar contraseñas de texto plano sin cifrar en la base de datos!
por lo tanto se instalar una libreria para generar los hashes de la contraseña
    npm install bcrypt

Definamos un enrutador separado para tratar con los usuarios en un nuevo archivo controllers/users.js. Usemos el enrutador en nuestra aplicación en el archivo app.js, de modo que maneje las solicitudes hechas a la URL /api/users:

se hacen cambios en el controlador de notes.js 

para poder unir las notas con los usuarios, no se puede hacer de forma directa con mongo, porque no es relacional, sin embargo mongoose hay una metodo que ayuda a esta parte
La unión de Mongoose se realiza con el método populate. Actualicemos la ruta que devuelve todos los usuarios primero:

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('notes')

  response.json(users)
})  

tambien se pueden modificar los controlers de las notas, para que cada nota haga referencia al usuario y al nombre de usuario 
