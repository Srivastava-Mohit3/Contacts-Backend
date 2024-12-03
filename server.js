const express = require('express')
const dotenv = require('dotenv').config()

const contactRoutes = require('./routes/contactRoutes')
const messageRoutes = require('./routes/messageRoutes')
const errorHandler = require('./middleware/errorHandler')
const connectDb = require('./config/dbConnection')

const app = express()
connectDb()

const port = process.env.PORT || 3000

app.use(express.json()) //body parser(middle ware used to access the data which is sent fron the client)
// app.use(errorHandler)

app.use("/api/contacts", contactRoutes)
app.use("/", messageRoutes)

app.use(errorHandler)

app.listen(port, () => {
    console.log(`server is listening at ${port}`);
})

