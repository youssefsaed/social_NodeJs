import express from 'express'
import { dBConnection } from './db/db.connection.js'
import authRouter from './src/modules/Auth/auth.routes.js'
import dotenv from 'dotenv'
import userRouter from './src/modules/users/user.routes.js'
import postesRouter from './src/modules/postes/post.routes.js'
import commentRouter from './src/modules/comments/comment.routes.js'
import cors from 'cors'



dotenv.config()

const app = express()
const port = 3000 || 5000
const BaseUrl = '/social'
app.use(cors())


//endPoint
app.use(express.json())
app.use(`${BaseUrl}/uploads`, express.static('./uploads'))
app.use(`${BaseUrl}`, authRouter)
app.use(`${BaseUrl}`, userRouter)
app.use(`${BaseUrl}`, postesRouter)
app.use(`${BaseUrl}`, commentRouter)




app.all('*', (req, res, next) => {
    next(new Error("invalid url - can't access this endpoint" + req.originalUrl))
})



//global error handdling
app.use((err,req,res,next)=>{
    res.status(err.status||500).json({"Error":err.message})
})

// app.use(globalError)











//connection
dBConnection()
app.listen(process.env.PORT || port, () => {
    console.log(`server is running on port ${port} .......`);
})