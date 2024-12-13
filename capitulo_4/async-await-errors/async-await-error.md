Async/await despeja un poco el código, pero el 'precio' es la estructura try/catch necesaria para detectar excepciones. Todos los controladores de ruta siguen la misma estructura

try {
  // realiza las operaciones asíncronas aquí
} catch(exception) {
  next(exception)
}

sin embargo se puede eliminar el catch con la libreria express-async-errors
para eso se tiene que instalar la libreria en el backend
    npm install express-async-errors
para usarla, es necesario importarla en app.js