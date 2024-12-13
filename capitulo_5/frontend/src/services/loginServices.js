import axios from "axios";
const baseURL='/api/login'

//hace una solicitud post de un controlador login de la siguiente forma loginRouter.post('/',async(req,res)....
//en la que se requiere un username y un password, generando un token, username y name
const loginPost=async(Credentials)=>{
    const acreditado=await axios.post(baseURL,Credentials)
    return acreditado.data
}

export default {loginPost}
