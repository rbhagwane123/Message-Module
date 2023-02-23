var mongoose = require('mongoose');

var Schema = mongoose.Schema;
 
var userSchema = new Schema({
 
    name:
    {
        type: String,
        require: true,
    },
    email: 
    {
        type: String,
        email: true,
        required: true
    },
    password:
    {
        type: String,
        require: true,
    },
    phone:
    {
        type:String,
        require: true
    },
    status:
    {
        type:String,
        require: true
    },
    image:
    {
        type:String,
        require: true
    }
        
});
 
module.exports = mongoose.model('Users', userSchema);