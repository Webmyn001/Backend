const lessonRoutes = require("./Routes/lessonRoutes")
const commentRoutes = require("./Routes/commentRoutes")


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





mongoose.set('strictQuery', false);
const connectDB = async ()=> {
   try{
      const conn = await mongoose.connect(process.env.MONGO_URI);
      console.log(`Mongodb connected :${conn.connection.host}`);

   } catch (error){
      console.log(error);
      process.exit(1);
   }
}

app.use("/api/lessons", lessonRoutes)
app.use("/api/comment", commentRoutes)



connectDB().then(()=> {
   app.listen(PORT, ()=> {
      console.log(`listening on port ${PORT}`)
   })
});