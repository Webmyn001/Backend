const express = require('express')
const mongoose = require('mongoose')
const Lesson = require ("../Models/lessonModels")
const multer = require('multer')

const {createLesson,
    deleteLesson,
    getLessons,
    getLesson,
    updatelesson,
   
} = require ('../Controller/lessonController')

const router = express.Router()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "Images")
  },
  filename: function(req, file, cb){
    cb(null, file.originalname)
  }
})



  let upload = multer({storage : storage})
  const multipleUpload = upload.fields([
    {name : "image1",  maxCount: 1 },
    {name: "image2",  maxCount: 1 },
    {name: "image3",  maxCount: 1 }


])


router.post('/addlesson', multipleUpload , createLesson)
router.get('/get', getLessons)
router.get('/:id', getLesson)
router.delete('/:id', deleteLesson)
router.patch('/:id', updatelesson)


 

module.exports= router
