El usuario comienza iniciando sesión usando un formulario de inicio de sesión implementado con React

Agregaremos el formulario de inicio de sesión a la interfaz en la parte 5
Esto hace que el código React envíe el nombre de usuario y la contraseña a la dirección del servidor /api/login como una solicitud HTTP POST.
Si el nombre de usuario y la contraseña son correctos, el servidor genera un token que identifica de alguna manera al usuario que inició sesión.

El token está firmado digitalmente, por lo que es imposible falsificarlo (con medios criptográficos)
El backend responde con un código de estado que indica que la operación fue exitosa y devuelve el token con la respuesta.
El navegador guarda el token, por ejemplo, en el estado de una aplicación React.
Cuando el usuario crea una nueva nota (o realiza alguna otra operación que requiera identificación), el código React envía el token al servidor con la solicitud.
El servidor usa el token para identificar al usuario

Primero implementemos la funcionalidad para iniciar sesión. Instala la librería jsonwebtoken, que nos permite generar tokens web JSON.
    npm install jsonwebtoken
 se crea un controller para el login
       login.js
Ahora, el código de inicio de sesión solo debe agregarse a la aplicación agregando el nuevo enrutador a app.js.

una vez que se cuenta con el token, se tiene que modificar el controlador para la generacion de notas, para que solo se genere una nota, si se cuenta con un token (el cual se genero cuando se enviaron el usuario y contraseñas correctas)

Se tiene que agregar un middleware de error para el caso de token, por lo tanto se agrega el error al middleware errorhandler 

Para poder agregar una nota, se tiene que poner de forma manual el token que se generó al hacer el login y pegarlo en la parte de authorization, en la parte que dice Bearer
