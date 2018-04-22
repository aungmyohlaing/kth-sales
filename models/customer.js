var mongoose = require('mongoose');

var Schema = mongoose.Schema;
ObjectID = Schema.ObjectId;

var customerShema = new Schema({
    customerid: ObjectID,
    name: String,
    email: String,
    mobile: String,
    phone: String,
    salesamount: Number,
    currentamount: Number,
    address1: String,
    address2:String
});

var Customer = mongoose.model('customer',customerShema);
module.exports = Customer;