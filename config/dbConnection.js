const mongoose = require('mongoose')

const connectDb = async () => {
    try {
        const db = await mongoose.connect(process.env.MONGO_URL)
        console.log("database connected: ", db.connection.host, " - ", db.connection.name);
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

module.exports = connectDb