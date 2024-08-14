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