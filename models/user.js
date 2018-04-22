var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');



var Schema = mongoose.Schema;
ObjectID = Schema.ObjectId;

var userSchmea = new Schema({
    userid: ObjectID,
    fullname: String,
    email: String,
    username: String,
    password: String,
    userType: String,
    createDate: Date
});

// hash the password
userSchmea.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8),null);
};

// get hash value password
userSchmea.methods.getHash = function(password){
    return bcrypt.hashSync(password);
}

// checking valid password
userSchmea.methods.validPassword = function(password,hashpwd){    
    return bcrypt.compareSync(password,hashpwd);
};


var User = mongoose.model('user',userSchmea);
module.exports = User;
