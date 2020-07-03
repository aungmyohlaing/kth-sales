"use strict";
const router = require("express").Router();
var customer = require("../models/customer");
var dailycollection = require("../models/collection");
var newvoucher = require("../models/newvoucher");
var returnitem = require("../models/returnitem");

/**
 * Customer app Routes
 */

router.route('/customer')
    .get(function (req, res) {
        customer.find({}, function (err, customers) {
            if (err) res.send(err);

            res.json(customers);
        })
    })
    .post(function (req, res) {
        var Customer = new customer();

        Customer.name = req.body.name;
        Customer.email = req.body.email;
        Customer.mobile = req.body.mobile;
        Customer.phone = req.body.phone;
        Customer.salesamount = parseInt(req.body.salesamount);
        Customer.currentamount = parseInt(req.body.salesamount);
        Customer.address1 = req.body.address1;
        Customer.address2 = req.body.address2;

        Customer.save(function (err) {
            if (err) res.send(err);

            res.json({ message: 'Successfully added!' });
        })
    });

router.route('/customer/return')
    .get(function (req, res) {
        customer.find({ currentamount: { $gt: 0 } }, function (err, customers) {
            if (err) res.send(err);

            res.json(customers);
        })
    })

/*
 * Customer Detail Router
 */
router.route('/customer/getById')
    .post(function (req, res) {
        customer.findOne({ _id: req.body.customerid }, function (err, data) {
            if (err) res.send(err);

            res.json(data);
        })
    });

router.route('/customer/getdaily')
    .post(function (req, res) {
        var query = dailycollection.find({ customerid: req.body.customerid }).sort({ collectiondate: -1 }).limit(6);
        query.exec(function (err, data) {
            if (err) res.send(err);
            res.json(data);
        })
    })

router.route('/customer/getnewvoucher')
    .post(function (req, res) {
        var query = newvoucher.find({ customerid: req.body.customerid, quantity: { "$gt": 0 } }).sort({ voucherdate: -1 }).limit(6);
        query.exec(function (err, data) {
            if (err) res.send(err);
            res.json(data);
        })
    })
router.route('/customer/getreturnitem')
    .post(function (req, res) {
        var query = returnitem.find({ customerid: req.body.customerid }).sort({ returndate: -1 }).limit(6);
        query.exec(function (err, data) {
            if (err) res.send(err);
            res.json(data);
        })
    })

    module.exports = router;