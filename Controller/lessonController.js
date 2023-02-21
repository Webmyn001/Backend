const Lesson = require("../Models/lessonModels")
const mongoose = require('mongoose')
const multer = require('multer')
const fs = require('fs')








// create new lesson
const createLesson =  (req, res) => {
 console.log(req.files.image1[0].filename)
 let lesson = new Lesson({
   Title: req.body.Title,
   Subtitle: req.body.Subtitle,
   Body1: req.body.Body1,
   Body2: req.body.Body2,
   Body3: req.body.Body3,
   image1: {
     data: fs.readFileSync('Images/' + req.files.image1[0].filename),
     contentType: "image/png",
   },
   image2: {
     data: fs.readFileSync('Images/' + req.files.image2[0].filename),
     contentType: "image/png",
   },
   image3: {
    data: fs.readFileSync('Images/' + req.files.image3[0].filename),
    contentType: "image/png",
  },
   Body4: req.body.Body4,
  

 })
 

 lesson.save()
     .then(lesson => {
         res.status(201).json(lesson);
     })
     .catch(err => {
         res.status(404).send('adding new todo failed');
     });

}


 
 // get all lessons

 const getLessons = async (req,res) => {
   const lesson = await Lesson.find({}).sort({createdAt:-1})
   res.status(200).json(lesson)
 }

 // get a single lesson 

 const getLesson = async (req,res) => { 
   const {id} = req.params

   if (!mongoose.Types.ObjectId.isValid(id)) {
       return res.status(404).json({error: "Not found"})
   }
   
   const lesson = await Lesson.findById(id)
  if (!lesson) {
   return res.status(404).json({error: "Not found"})
 }
  res.status(200).json(lesson)
 }

 //delete lesson

 const deleteLesson = async (req, res) => {
   const {id} = req.params
   if (!mongoose.Types.ObjectId.isValid(id)) {
       return res.status(404).json({error: "Not found"})
   }
   
   const lesson = await Lesson.findOneAndDelete({_id:id})
  if (!lesson) {
   return res.status(400).json({error: "Not found"})
 }
  res.status(200).json(lesson)
 }


// update lesson

const updatelesson = async(req, res) => {
   const {id} = req.params
   if (!mongoose.Types.ObjectId.isValid(id)) {
       return res.status(404).json({error: "Not found"})
   }
   const lesson = await Lesson.findOneAndUpdate({_id:id}, {...req.body})
   if (!lesson) {
       return res.status(400).json({error: "Not found"})
     }
      res.status(200).json(lesson)
     }


     

module.exports = {
  getLesson,
  getLessons,
  deleteLesson,
  updatelesson,
  createLesson,  
}



















     

    