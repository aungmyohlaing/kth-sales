var mongoose = require('mongoose');

var Schema = mongoose.Schema;
ObjectID = Schema.ObjectId;

var returnitem = new Schema({
    voucherId: ObjectID,
    customerid: String,
    returndate: Date,
    voucherno: String, 
    itemno: String,
    itemname: String,
    quantity: Number,
    price: Number,
    amount: Number,
    createdate: Date
});

var returnitems = mongoose.model('returnitems', returnitem);
module.exports = returnitems;