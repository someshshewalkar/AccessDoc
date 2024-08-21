<<<<<<< HEAD
const mongoose = require('mongoose')

mongoose.connect(`mongodb://localhost:27017/authentication`)

const userSchema = mongoose.Schema({
    username : String,
    email : String,
    password : String,
    age : Number
})

module.exports = mongoose.model("users",userSchema)

=======
const { default: mongoose } = require("mongoose")
const moongose = require("mongoose")
moongose.connect("mongodb://localhost:27017/miniproject")

const userSchema = mongoose.Schema({
    name:String,
    username:String,
    email:String,
    password:String,
    age:Number
})

module.exports = mongoose.model("user",userSchema)
>>>>>>> d67c6789feb7c88ccf7ff33be0db0e120e5ac3c4
