const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/userdeatils')
.then((data)=>console.log('connect'))
.catch((e)=>console.log(e))

let userSchemad = mongoose.Schema({
    name:String,
    email:String,
    city:String,
    state:String,
    password:String
})

let userModel = mongoose.model('userSchema',userSchemad)

module.exports = {
    userModel
}