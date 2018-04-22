var mongoose = require('mongoose');

var Schema = mongoose.Schema;
ObjectID = Schema.ObjectId;

var daily_collection = new Schema({
    dailyid: ObjectID,
    customerid: String,
    voucherno: String,
    amount: Number,
    createdate: Date,
    collectiondate: Date

})

var DailyCollection = mongoose.model('daily_collection', daily_collection);
module.exports = DailyCollection;