const mongoose = require('mongoose');

const hisaabSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        maxlength: [100, 'Title cannot be more than 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Data is required'],
        trim: true
    },
    user: {
        type: String,
        required: [true, 'User is required'],
        trim: true
    },
    editpermission: {
        type: Boolean,
        default: true
    },
    shareable: {
        type: Boolean,
        default: false
    },
    encrypted: {
        type: Boolean,
        default: false
    },
    passcode: {
        type: String,
        default:"",
        trim: true,
        validate: {
            validator: function(v) {
                // Custom validation for passcode (if needed)
                return v.length === 4; // Example: Passcode must be exactly 4 characters long
            },
            message: props => `${props.value} is not a valid passcode! Passcode must be exactly 4 characters long.`
        }
    }
}, {
    timestamps: true
});



module.exports =  mongoose.model('hisaab', hisaabSchema);
