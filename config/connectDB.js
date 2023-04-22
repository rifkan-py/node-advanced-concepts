const mongoose = require('mongoose')

async function connectDB() {
    try {
        const {connection} = await mongoose.connect(process.env.MONGO_URI)
        console.log(`server is connected ${connection.host}`)
    } catch(error) {
        console.log(error)``
    }

}

module.exports = connectDB