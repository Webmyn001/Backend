const express = require('express')
const mongoose = require('mongoose')
const Comment = require ("../Models/commentModel")


const { 
    getComments,
    createComment,
    deleteComment,
    updatelesson,
   
} = require ('../Controller/commentController')

const router = express.Router()




router.post('/addcomment', createComment)
router.get('/', getComments)
router.delete('/:id', deleteComment)
router.patch('/:id', updatelesson)



 

module.exports= router
