 const Lesson = require("../models/lessonModel")
 const mongoose = require('mongoose')
 const multer = require('multer')
 const fs = require('fs')
const Update = require("../models/UpdateModel")
 


// create new update 
const CreateUpdate =  (req, res) => {
  let updateNews = new Update({
    Text : req.body.Text,
  }) 
  updateNews.save()
  .then(updateNews => {
    res.status(201).json(updateNews);
})
.catch(err => {
    res.status(404).send('Unable to post update');
});
}

 // get updated post

 const getUpdateNews = async (req,res) => {
  const updateNews = await Update.find().sort({createdAt:-1})
  res.status(200).json(updateNews)
}


// delete update post

const deleteUpdate = async (req, res) => {
  const {id} = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: "Not found"})
  }
  
  const updateNews = await Update.findOneAndDelete({_id:id})
 if (!updateNews) {
  return res.status(400).json({error: "Not found"})
}
 res.status(200).json(updateNews)
}










 // create new lesson
 const createLesson =  (req, res) => {
  console.log(req.files.IDcardimage[0].filename)
  let lesson = new Lesson({
    Name: req.body.Name,
    School: req.body.School,
    BankName: req.body.BankName,
    AcctName: req.body.AcctName,
    AcctNo: req.body.AcctNo,
    IDcardimage: {
      data: fs.readFileSync('Images/' + req.files.IDcardimage[0].filename),
      contentType: "image/png",
    },
    Jambimage: {
      data: fs.readFileSync('Images/' + req.files.Jambimage[0].filename),
      contentType: "image/png",
    },
    Whatsapp: req.body.Whatsapp,
    Shortnote: req.body.Shortnote,
 
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
   deleteUpdate,
   getUpdateNews,
   CreateUpdate,
   
}



















      

     