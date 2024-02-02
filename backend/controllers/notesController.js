const asyncHandler = require('express-async-handler')

const Ticket = require('../models/ticketModel')
const User = require('../models/userModel')
const Notes = require('../models/notesModel')

// Desc : Get Notes From Ticket
// Route : GET /api/tickets/:ticketid/notes
// Access : Private


const getNotes = asyncHandler(async(req,res)=>{
   
    // Get user from the id in JWT

    const user = await User.findById(req.user.id)
    if(!user){
        res.status(401)
        throw new Error("User Not Found")
    }

    // Get Tickets
    const ticket = await Ticket.findById(req.params.ticketId)
    if(ticket.user.toString() !== req.user.id){
        res.status(401)
        throw new Error("Un Authorized")
    }

    const notes = await Notes.find({ticket : req.params.ticketId})
    res.status(200).json(notes)

})


const addNote = asyncHandler(async(req,res)=>{
        // Get user from the id in JWT

        const user = await User.findById(req.user.id)
        if(!user){
            res.status(401)
            throw new Error("User Not Found")
        }
    
        // Get Tickets
        const ticket = await Ticket.findById(req.params.ticketId)
        if(ticket.user.toString() !== req.user.id){
            res.status(401)
            throw new Error("Un Authorized")
        }

        const note = await Notes.create({
            text : req.body.text,
            isStaff : false,
            ticket : req.params.ticketId,
            user : req.user.id
        })

        res.status(201).json(note)

})


module.exports = {
    getNotes,
    addNote
}