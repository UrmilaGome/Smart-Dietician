const express = require('express')
const { getNotes, addNote } = require('../controllers/notesController')
const router = express.Router({mergeParams : true})
const {protect} = require('../middleware/authMiddleware')


router.route('/').get(protect , getNotes).post(protect , addNote)

module.exports = router
