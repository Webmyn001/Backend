const lessonRoutes = require("./Routes/lessonRoutes")
const updateRoutes = require("./Routes/updateRoutes")

const express = require("express")
require("dotenv").config()
const mongoose = require('mongoose')
const bp = require('body-parser')
const cors =require("cors") 

const app = express()

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

app.use(cors());

app.use((req,res, next) => {
   console.log(req.path , req.body ,req.method , res.body)
   next()
})


app.use("/api/lessons", lessonRoutes)
app.use("/api/updates", updateRoutes)




 
mongoose.connect(process.env.MONGO_URI
   )
 .then(()=>{
    app.listen(process.env.PORT, ()=> {
    console.log('listening on port 5000.......................')
})

 }). catch((error) => {
    console.log(error)
 })
