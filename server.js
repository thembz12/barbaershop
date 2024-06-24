const express = require ("express")
const dotenv = require ("dotenv").config() 

const mongoose = require ("mongoose")
const port = process.env.port

const app = express()
const router = require ("./Router/userRouter.js")

app.use(express.json())
app.use(router)

mongoose.connect(process.env.database).then(()=>{
    app.listen(port,()=>{
        console.log(`server is running on ${port}`)})
console.log("Database connected succesfully");
}).catch((error)=>{
    console.log(`unable to connect to database because ${error}`);
})

app.get("/", (req,res)=>{
    res.status(200).json({message:"waHlAY"})
})

