
const mongoose = require('mongoose')
const Comment = require("../Models/commentModel")










// create new comment
const createComment =  (req, res) => {
 let newcomment = new Comment({
    Name : req.body.Name,
   School : req.body.School,
   Department : req.body.Department,
   Level: req.body.Level,
   Comment : req.body.Comment,

 }) 
  newcomment.save()
 .then(newcomment => {
   res.status(201).json(newcomment);
})
.catch(err => {
   res.status(404).send('Unable to post update');
});
}

// get comment 


const getComments = async (req,res) => {
 const newcomment = await Comment.find().sort({createdAt:-1})
 res.status(200).json(newcomment)
}


// delete comment

const deleteComment = async (req, res) => {
 const {id} = req.params
 if (!mongoose.Types.ObjectId.isValid(id)) {
     return res.status(404).json({error: "Not found"})
 }
 
 const newcomment = await Comment.findOneAndDelete({_id:id})
if (!newcomment) {
 return res.status(400).json({error: "Not found"})
}
res.status(200).json(newcomment)
}

const updatelesson = async(req, res) => {
   const {id} = req.params
   if (!mongoose.Types.ObjectId.isValid(id)) {
       return res.status(404).json({error: "Not found"})
   }
   const newcomment = await Comment.findOneAndUpdate({_id:id}, {...req.body})
   if (!newcomment) {
       return res.status(400).json({error: "Not found"})
     }
      res.status(200).json(newcomment)
     }




module.exports = {
   getComments,
   createComment,
   deleteComment, 
   updatelesson  
}