
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
    }else if(error.name==='MongoServerError'){
        res.status(400).json({error:'error en el servidor de mongoose'})
    }else if(error.name==='JsonWebTokenError') {
        return res.status(401).json({ error: 'token invalid' })
    }else if(error.name==='TokenExpiredError'){
        res.status(401).json({error:'token expired'})
    }
    next(error)
}

module.exports={requestLogger,endpointDesconocido,errorHandler}