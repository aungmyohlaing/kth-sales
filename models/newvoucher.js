var mongoose = require('mongoose');

var Schema = mongoose.Schema;
ObjectID = Schema.ObjectId;

var voucher = new Schema({
    voucherId: ObjectID,
    customerid: String,
    voucherdate: Date,
    voucherno: String,
    itemno: String,
    itemname: String,
    quantity: Number,
    price: Number,
    amount: Number,
    createdate: Date
});

var newvoucher = mongoose.model('voucher', voucher);
module.exports = newvoucher;