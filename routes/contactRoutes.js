const express = require('express')
const router = express.Router()

const {getContacts, getContact, addContact, updateContact, deleteContact} = require('../controller/contactController')

router.get("/", getContacts)  

router.get("/:id", getContact)

router.post("/", addContact)

router.put("/:id", updateContact)

router.delete("/:id", deleteContact)

module.exports = router