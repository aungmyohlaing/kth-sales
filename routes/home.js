'use strict'

const home = require('express').Router();
const customer = require('../models/customer');


home.route('/home/topten')
    .get(function (req, res) {
        var query = customer.find({}).sort({ salesamount: -1 }).limit(10);

        query.exec(function (err, data) {
            if (err) res.send(err);

            res.json(data);
        })
});

module.exports = home;