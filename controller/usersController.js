const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/usersModel')

const userRegister = asyncHandler(async(req, res) => {
    const {username, email, password} = req.body;
    if(!username || !email || !password) {
        res.status(400)
        throw new Error("All fields are mandatory!!")
    }
    const userAvailable = await User.findOne({ email })
    if(userAvailable) {
        res.status(400)
        throw new Error("User already exits!!")
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    // console.log("hashed password: ", hashedPassword);
    const user = await User.create({
        username,
        email, 
        password: hashedPassword,
    })
    console.log(`user created: ${user}`);
    if(user) {
        return res.status(201).json({ _id: user.id, email: user.email })
    } else {
        res.status(400)
        throw new Error("User data is not valid!")
    }
})

const userLogin = asyncHandler(async(req, res) => {
    const {email, password} = req.body;
    if(!email || !password) {
        res.status(400)
        throw new Error("All fields are mandatory!!")
    }
    const user = await User.findOne({ email })
    if(user && (bcrypt.compare(password))) {
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id,
            },
        }, process.env.ACCESS_TOKEN_SECERT,
            {expiresIn: "1m"})
        res.status(200).json({ accessToken })
    } else {
        res.status(401)
        throw new Error("email or password is not valid!!")
    }
    res.json({"message": "User is login!!"})
})

const currentUser = asyncHandler(async(req, res) => {
    res.json({"message": `Current user is ${req.params.id}`})
})

module.exports = {userRegister, userLogin, currentUser}