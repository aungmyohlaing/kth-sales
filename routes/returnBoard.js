'use strict'
const returnBoard = require('express').Router();
var returnitem = require('../models/returnitem');

returnBoard.route('/return/charts/thisyear')
.post(function (req, res) {
    returnitem.aggregate([
        {
            "$project": {
                "customerid": "$customerid",
                "voucherdate": "$voucherdate",
                "voucherno": "$voucherno",
                "itemno": "$itemno",
                "itemname": "$itemname",
                "quantity": "$quantity",
                "price": "$price",
                "amount": "$amount",
                "createdate": "$createdate",
                "returnyear": { "$year": "$returndate" },
                "returnmonth": { "$month": "$returndate" },
                "returnday": { "$dayOfMonth": "$returndate" }
            }
        },
        {
            "$match": {
                "returnyear": parseInt(req.body.fullyear)
            }
        },
        {
            "$group": {
                "_id": { month: "$returnmonth" },
                "totalreturn": { "$sum": "$amount" }
            }
        }], function (err, data) {
            if (err) res.send(err);
            res.json(data);
        }
    );
});

returnBoard.route('/home/monthly/totalreturn')
.post(function (req, res) {
    let currentYear = new Date().getFullYear();    
    returnitem.aggregate([
        {
            "$project": {
                "customerid": "$customerid",
                "voucherdate": "$voucherdate",
                "amount": "$amount",
                "returnyear": { "$year": "$returndate" },
                "returnmonth": { "$month": "$returndate" },
                "returnday": { "$dayOfMonth": "$returndate" }
            }
        },
        {
            "$match": {
                "returnmonth": parseInt(req.body.currentmonth),
                "returnyear": currentYear
            }
        },
        {
            "$group": {
                "_id": null,
                "totalreturn": { "$sum": "$amount" }
            }
        }], function (err, data) {
            if (err) res.send(err);
            res.json(data);
        }
    );
});


returnBoard.route('/home/yearly/totalreturn')
.post(function (req, res) {
    returnitem.aggregate([
        {
            "$project": {
                "customerid": "$customerid",
                "voucherdate": "$voucherdate",
                "amount": "$amount",
                "returnyear": { "$year": "$returndate" },
                "returnmonth": { "$month": "$returndate" },
                "returnday": { "$dayOfMonth": "$returndate" }
            }
        },
        {
            "$match": {
                "returnyear": parseInt(req.body.currentyear)
            }
        },
        {
            "$group": {
                "_id": null,
                "totalreturn": { "$sum": "$amount" }
            }
        }], function (err, data) {
            if (err) res.send(err);
            res.json(data);
        }
    );
});

/**
* Most Return Items API
*/
returnBoard.route('/home/mostreturn')
.post(function (req, res) {
    let currentYear = new Date().getFullYear(); 
    returnitem.aggregate([
        {
            "$project": {
                "customerid": "$customerid",
                "voucherdate": "$voucherdate",
                "itemno": "$itemno",
                "itemname": "$itemname",
                "quantity": "$quantity",
                "amount": "$amount",
                "returnyear": { "$year": "$returndate" },
                "returnmonth": { "$month": "$returndate" },
                "returnday": { "$dayOfMonth": "$returndate" }
            }
        },
        {
            "$match": {
                "returnmonth": parseInt(req.body.currentmonth),
                "returnyear": currentYear
            }
        },
        {
            "$group": {
                "_id": { itemno: "$itemno", itemname: "$itemname" },
                "totalquantity": { "$sum": "$quantity" }
            }
        },
        { "$sort": { totalquantity: -1 } },
        { "$limit": 5 }
    ], function (err, data) {
        if (err) res.send(err);
        res.json(data);
    }
    );
});

module.exports = returnBoard;