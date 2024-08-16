const mongoose = require('mongoose');

const userSchema =  mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        minlength: [3, 'Username must be at least 3 characters long'],
        maxlength: [50, 'Username must be at most 50 characters long'],
        trim: true
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
        minlength: [1, 'Name must be at least 1 character long'],
        maxlength: [100, 'Name must be at most 100 characters long'],
        trim: true
    },
   profilepicture:{type:String,
    trim:true},
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [/.+\@.+\..+/, 'Please enter a valid email address'],
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long'],
        select:false,
    },
    hisaab: [{type:mongoose.Schema.Types.ObjectId,ref:"hisaab"}] ,
    
});


module.exports=mongoose.model("user",userSchema);