
const requestLogger=(req,res,next)=>{
    console.log(`Method: ${req.method}`)
    console.log(`Path: ${req.path}`)
    console.log(`Body: ${req.body}`)
    console.log(`----`)
    next()
}

const endpointDesconocido=(req,res,next)=>{
    res.status(404).send({error:'no se encuentra el endpoint'})
}

const errorHandler=(error,req,res,next)=>{
    console.error(error.message)
    if(error.name==='CastError'){
      return res.status(400).send({error:'no coincide el formato'})
    }else if(error.name==='ValidationError'){
        res.status(404).json({error:error.message})
    }
    next(error)
}

module.exports={requestLogger,endpointDesconocido,errorHandler}