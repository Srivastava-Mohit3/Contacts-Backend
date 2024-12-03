const readMessages = (req, res) => {
    res.status(200).json({"message": "get all the messages"})
}

const addMessages = (req, res) => {
    res.status(200).json({"message": "adding the new messages"})
}

const deleteMessage = (req, res) => {
    res.status(200).json({"message": "deleting message"})
}

module.exports = {readMessages, addMessages, deleteMessage}