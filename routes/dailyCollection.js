"use strict"
const router = require("express").Router();
var dailycollection = require("../models/collection");
var customer = require("../models/customer");
var newvoucher = require("../models/newvoucher");

router.route('/dailycollection')
.get(function (req, res) {
    dailycollection.find({}, function (err, collection) {
        if (err) res.send(err);

        res.json(collection);
    })
})
.post(function (req, res) {
    var DailyCollection = new dailycollection();

    DailyCollection.customerid = req.body.customerid;
    DailyCollection.voucherno = req.body.voucherno;
    DailyCollection.amount = req.body.amount;
    DailyCollection.createdate = req.body.createDate;
    DailyCollection.collectiondate = req.body.selectedDate

    DailyCollection.save(function (err) {
        if (err) res.send(err);

        res.json({ message: 'Successfully added!' });
    })
});

router.route('/dailycollection/update/customer')
.put(function (req, res) {
    var updateCustomer = new customer();

    updateCustomer.currentamount = req.body.currentamount;

    customer.findById(req.body.customerid, function (err, customer) {
        if (err) res.send(err);

        customer.currentamount = req.body.currentamount;
        customer.save(function (err) {
            if (err) res.send(err);

            res.json({ message: 'Customer has been updated!' })
        });
    })
});

router.route('/dailycollection/getvouchers')
.post(function (req, res) {
    newvoucher.aggregate([
        {
            "$project": {
                "customerid": "$customerid",
                "voucherno": "$voucherno"
            }
        },
        {
            "$match": {
                "customerid": req.body.customerid,
                "voucherno": req.body.voucherno
            }
        },
        {
            "$group": {
                _id: "$voucherno"
            }
        }
    ], function (err, data) {
        if (err) res.send(err);
        res.json(data);
    });
});

router.route('/dailycollection/getItemsByVoucher')
.post(function (req, res) {
    newvoucher.aggregate([
        {
            "$project": {
                "customerid": "$customerid",
                "voucherno": "$voucherno",
                "amount": "$amount"
            }
        },
        {
            "$match": {
                "customerid": req.body.customerid,
                "voucherno": req.body.voucherno                    
            }
        },
        {
            "$group": {
                _id: "$voucherno",
                totalamount: {"$sum":"$amount"}
            }
        }
    ], function (err, data) {
        if (err) res.send(err);
        res.json(data);
    });
})

router.route('/dailycollection/getCollectedVoucher')
.post(function (req, res) {
    dailycollection.aggregate([
        {
            "$project": {
                "customerid": "$customerid",
                "voucherno": "$voucherno",
                "amount": "$amount"
            }
        },
        {
            "$match": {
                "customerid": req.body.customerid,
                "voucherno": req.body.voucherno                    
            }
        },
        {
            "$group": {
                _id: "$voucherno",
                totalamount: {"$sum":"$amount"}
            }
        }
    ], function (err, data) {
        if (err) res.send(err);
        res.json(data);
    });
})

module.exports = router;