const express = require('express')
const router = express.Router()

const {readMessages, addMessages, deleteMessage} = require('../controller/messageController')

router.get("/api/messages", readMessages)
router.put("/api/messages", addMessages)
router.delete("/api/message", deleteMessage)

module.exports = router