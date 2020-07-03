"use strict"
const router = require("express").Router();
var newvoucher = require("../models/newvoucher");
var customer = require("../models/customer");

/**
 * New Voucher Router
 */

router.route('/newvoucher')
    .post(function (req, res) {
        var newVoucher = new newvoucher();

        newVoucher.customerid = req.body.customerid;
        newVoucher.voucherdate = req.body.voucherdate;
        newVoucher.voucherno = req.body.voucherno;
        newVoucher.itemno = req.body.itemno;
        newVoucher.itemname = req.body.itemname;
        newVoucher.quantity = req.body.quantity;
        newVoucher.price = req.body.price;
        newVoucher.amount = req.body.amount;
        newVoucher.createdate = req.body.createdate;

        newVoucher.save(function (err) {
            if (err) res.send(err);

            res.json({ message: 'Successfully added!' });
        })
    });

router.route('/newvoucher/update/customer')
    .put(function (req, res) {

        customer.findById(req.body.customerid, function (err, customer) {
            if (err) res.send(err);

            customer.currentamount = customer.currentamount + req.body.amount;
            customer.salesamount = customer.salesamount + req.body.amount;
            customer.save(function (err) {
                if (err) res.send(err);

                res.json({ message: 'Customer has been updated!' })
            });
        })
    });

    module.exports = router;