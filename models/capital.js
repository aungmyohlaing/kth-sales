var mongoose = require('mongoose');

var Schema = mongoose.Schema;
ObjectID = Schema.Objectid;

var capital = new Schema({
    capitalId: ObjectID,
    customerId: String,
    amount: Number
})

var Capital = mongoose.model('capital', capital);
module.exports = Capital;