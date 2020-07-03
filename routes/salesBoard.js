'use strict'

const salesBoard = require('express').Router();
var newvoucher = require('../models/newvoucher');

salesBoard.route('/charts/thisyear')
.post(function (req, res) {
    newvoucher.aggregate([
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
                "salesyear": { "$year": "$voucherdate" },
                "salesmonth": { "$month": "$voucherdate" },
                "salesday": { "$dayOfMonth": "$voucherdate" }
            }
        },
        {
            "$match": {
                "salesyear": parseInt(req.body.fullyear)
            }
        },
        {
            "$group": {
                "_id": { month: "$salesmonth" },
                "totalsales": { "$sum": "$amount" }
            }
        }], function (err, data) {
            if (err) res.send(err);
            res.json(data);
        }
    );
});

salesBoard.route('/home/yearly/totalsales')
.post(function (req, res) {
    newvoucher.aggregate([
        {
            "$project": {
                "customerid": "$customerid",
                "voucherdate": "$voucherdate",
                "amount": "$amount",
                "salesyear": { "$year": "$voucherdate" },
                "salesmonth": { "$month": "$voucherdate" },
                "salesday": { "$dayOfMonth": "$voucherdate" }
            }
        },
        {
            "$match": {
                "salesyear": parseInt(req.body.currentyear)
            }
        },
        {
            "$group": {
                "_id": null,
                "totalsales": { "$sum": "$amount" }
            }
        }], function (err, data) {
            if (err) res.send(err);
            res.json(data);
        }
    );
});

salesBoard.route('/home/monthly/totalsales')
.post(function (req, res) {
    let currentYear = new Date().getFullYear();
    newvoucher.aggregate([
        {
            "$project": {
                "voucherdate": "$voucherdate",
                "amount": "$amount",
                "salesyear": { "$year": "$voucherdate" },
                "salesmonth": { "$month": "$voucherdate" },
                "salesday": { "$dayOfMonth": "$voucherdate" }
            }
        },
        {
            "$match": { 
                "salesmonth": parseInt(req.body.currentmonth),
                "salesyear": currentYear
            }
        },
        {
            "$group": {
                "_id": null,
                "totalsales": { "$sum": "$amount" }
            }
        }], function (err, data) {
            if (err) res.send(err);

            res.json(data);
        }
    );
});

salesBoard.route('/home/topselling')
.post(function (req, res) {
    let currentYear = new Date().getFullYear();
    newvoucher.aggregate([
        {
            "$project": {
                "customerid": "$customerid",
                "voucherdate": "$voucherdate",
                "itemno": "$itemno",
                "itemname": "$itemname",
                "quantity": "$quantity",
                "amount": "$amount",
                "salesyear": { "$year": "$voucherdate" },
                "salesmonth": { "$month": "$voucherdate" },
                "salesday": { "$dayOfMonth": "$voucherdate" }
            }
        },
        {
            "$match": {
                "salesmonth": parseInt(req.body.currentmonth),
                "salesyear": currentYear
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

module.exports = salesBoard;