"use strict"
const router = require("express").Router();
var returnitem = require("../models/returnitem");
var newvoucher = require("../models/newvoucher");
var customer = require("../models/customer");
/**
 * Return Items Router
 */

router.route('/returnitems')
    .post(function (req, res) {
        var ReturnItem = new returnitem();

        ReturnItem.customerid = req.body.customerid;
        ReturnItem.returndate = req.body.returndate;
        ReturnItem.voucherno = req.body.voucherno;
        ReturnItem.itemno = req.body.itemno;
        ReturnItem.itemname = req.body.itemname;
        ReturnItem.quantity = req.body.quantity;
        ReturnItem.price = req.body.price;
        ReturnItem.amount = req.body.amount;
        ReturnItem.createdate = req.body.createdate;

        ReturnItem.save(function (err) {
            if (err) res.send(err);

            res.json({ message: 'Successfully added!' });
        })
    });

router.route('/returnitems/update/customer')
    .put(function (req, res) {
        customer.findById(req.body.customerid, function (err, customer) {
            if (err) res.send(err);

            customer.currentamount = customer.currentamount - req.body.amount;
            customer.salesamount = customer.salesamount - req.body.amount;
            customer.save(function (err) {
                if (err) res.send(err);

                res.json({ message: 'Customer has been updated!' })
            });
        })
    });

router.route('/returnitems/getvouchers')
    .post(function (req, res) {
        newvoucher.aggregate([
            {
                "$project": {
                    "customerid": "$customerid",
                    "voucherno": "$voucherno",
                    "quantity": "$quantity",
                    "amount": "$amount"
                }
            },
            {
                "$match": {
                    "customerid": req.body.customerid,
                    "quantity": { "$gt": 0 },
                    "amount": { "$gt":0}
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
router.route('/returnitems/update/voucher')
    .put(function (req, res) {

        newvoucher.findOne({ customerid: req.body.customerid, voucherno: req.body.voucherno, itemno: req.body.itemno }, function (err, voucher) {
            if (err) res.send(err);


            voucher.quantity = voucher.quantity - req.body.quantity;
            voucher.amount = voucher.amount - req.body.amount;

            voucher.save(function (err) {
                if (err) res.send(err);

                res.json({ message: 'Voucher has been updated!' })
            });
        })
    });

router.route('/returnitems/getitems')
    .post(function (req, res) {
        newvoucher.aggregate([
            {
                "$project": {
                    "customerid": "$customerid",
                    "voucherno": "$voucherno",
                    "itemno": "$itemno",
                    "quantity": "$quantity"
                }
            },
            {
                "$match": {
                    "customerid": req.body.customerid,
                    "voucherno": req.body.voucherno,
                    "quantity": { "$gt": 0 }
                }
            }
        ], function (err, data) {
            if (err) res.send(err);
            res.json(data);
        });
    });

router.route('/returnitems/getitembyid')
    .post(function (req, res) {
        newvoucher.aggregate([
            {
                "$project": {
                    "voucherno": "$voucherno",
                    "itemno": "$itemno",
                    "itemname": "$itemname",
                    "quantity": "$quantity",
                    "price": "$price"
                }
            },
            {
                "$match": {
                    "voucherno": req.body.voucherno,
                    "itemno": req.body.itemno
                }
            }
        ], function (err, data) {
            if (err) res.send(err);
            res.json(data);
        });
    });


    module.exports = router;