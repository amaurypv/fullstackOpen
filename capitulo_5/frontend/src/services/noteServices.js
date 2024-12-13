/* se va a crear este archivo para simplificar los request que se van a utilizar
en app.jsx 
por lo que se tiene que importar la libreria axios*/
import axios from 'axios'
//se define la base de la direccion del servidor
const baseURL='/api/notes'

//se tiene que definir una variable llamada token para que pueda ser guardado con el token que se va a generar en las siguientes funciones
let token=null

//se va a generar una funcion que convierta el token en bearer
const setToken=newTOken=>{
    token=`Bearer ${newTOken}`
}

//se va a definir el request get mediante axios
const getAll=()=>{
    const request= axios.get(baseURL)
    return request.then(response=>response.data)
}

//se va a definir el request post mediante axios el cual pide la base de la direccion
//y el nuevo objeto que se quiere crear pero para eso es necesario, contar con un token
const create=async(newObject)=>{
    //se crea una variable que contiene un objeto de encabezado, dentro del objeto se el encabezado que contiene otro objeto la llave va a ser Authorization  El encabezado Authorization le permite al servidor identificar que la solicitud está autenticada. Los servidores generalmente requieren este encabezado para validar si el cliente tiene permisos para acceder a ciertos recursos.
    const config={headers:{Authorization:token}}
    // la solicitud para un post se envia con 3 argumentos, la url base, el objeto que se quiere agregar y el encabezado con las credenciales para la autorización
    const response= await axios.post(baseURL,newObject,config)
    // La función devuelve solo los datos de la respuesta (response.data), que usualmente contiene el resultado procesado de la solicitud (por ejemplo, el nuevo objeto creado en el servidor).
    return response.data

}

//se va a definir el request put para editar un objeto existente en el servidor. 
//para eso se necesita el id y la forma de ponerlo en su url es la base +id
// y como se quiere modificar el objeto existente
const update=async(id,newObject)=>{
    const request=axios.put(`${baseURL}/${id}`,newObject)
    return request.data

//se va a definir un request para eliminar una nota por su id
//axios.delete()solo lleva la url y el id, no necesita nada mas como argumento
}
const eliminar=(id)=>{
    const request=axios.delete(`${baseURL}/${id}`)
    return request.then(response=>console.log(response.data))
}
    
//se exportan las funciones, al momento de importar, se importan todas, por lo tanto para 
//llamar las funciones sera necesario poner noteServices.getAll()....
export default {getAll,create,update,eliminar,setToken}