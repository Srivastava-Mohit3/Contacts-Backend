const asyncHandler = require('express-async-handler')
const Contact = require('../models/contactModel')

const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find()
    // res.status(200).json({"message": "this is contact api!! from controller file"})
    res.status(200).json(contacts)
})

const getContact = asyncHandler(async (req, res) => {
    const foundContact = await Contact.findById(req.params.id)
    if(!foundContact) {
        res.status(404)
        throw new Error("Contact not found")
    }
    res.status(200).json(foundContact)
})

const addContact = asyncHandler(async (req, res) => {
    const data = req.body
    const { name, email, phone } = data
    if(!name || !email || !phone) {
        res.status(400)
        throw new Error("all fields are mandatory" )
    }

    const newContact = await Contact.create({
        name : req.body.name,
        email : req.body.email,
        phone : req.body.phone,


        // can also be assigned the value to the variable because of the es6
        // const newConatct = Contact.create({
            // first_name, 
            // last_name, 
            // phone_no
        // })
    })
    
    console.log("dislaying the data: ", data);
    res.status(200).json(newContact)
})

const updateContact = asyncHandler(async (req, res) => {
    const foundContact = await Contact.findById(req.params.id)
    if(!foundContact) {
        res.status(404)
        throw new Error("Contact not found")
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    )
    res.status(200).json(updatedContact)
})

const deleteContact = asyncHandler(async (req, res) => {
    const foundContact = await Contact.findById(req.params.id)
    if(!foundContact) {
        res.status(404)
        throw new Error("Contact not found")
    }
    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json(foundContact)
})

module.exports = {getContacts, getContact, addContact, updateContact, deleteContact}