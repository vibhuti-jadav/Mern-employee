
import express from "express";
import employRouter from "./router/employRouter.js"
import httpError from "./middleware/errorHandling.js";
import connectDb from "./config/db.js";
import cors from "cors"


const app = express()

app.use(express.json())

app.use(cors())

app.use("/employ",employRouter)

app.get("/",(req,res)=>{    
   res.status(200).json("hello from server")
})



app.use((req,res,next)=>{
    return next(new httpError("router re not find",404))
})

app.use((error,req,res,next)=>{
    if(req.headersSent){
        return next(error)
    }

    res.status(error.statusCode || 500).json(error.message || "somthing went wrong try again")
})

const port = 5000

const startServer = async()=>{

    try {
        
        const connect = await connectDb()

        if(!connect){
            console.log("db failed to connect")
        }
        console.log("db connectted")

app.listen(port,()=>{
    console.log(`server running on ${port}`)
})
        
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}

startServer()






