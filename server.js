'use strict'

var express = require('express');
var mongoose = require('mongoose');
var cors = require('cors');
var bodyParser = require('body-parser');
const path = require('path');

var app = express();
var router = express.Router();

var env = require('dotenv').load();

/**
 * Moogo DB Connection
 */
//Local MongoDB Connection
//mongoose.connect('mongodb://192.168.99.170/kth');
// mongoose.connect('mongodb://kth:WlPFZhgaiMSEuFoYXGHb73GbDX04vndb1GPwhBfeKxqC1swLqcDUWgdvpoeP7JKnBgXsEgD9QnkWLwFbvCVekw%3D%3D@kth.documents.azure.com:10255/?ssl=true&replicaSet=globaldb');
// MS Azure Cosmosdb Connection
// mongoose.connect(process.env.COSMOSDB_CONSTR+process.env.COSMOSDB_DBNAME+"?ssl=true&replicaSet=globaldb");
// MongoDB Atlas Connection
 mongoose.connect(process.env.ATLAS_CONSTR);
var db = mongoose.connection;
//bind error info
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connected to DB');
});

// var mongoClient = require("mongodb").MongoClient;
// mongoClient.connect("mongodb://kth:9DhGsFCI8WBgLMquFJPjWzaE01GXPIXttQEVIUj1yVj2WEJGyqJZi5C8kKicENP65CVxGTUK3OfMQQrWoECcFg%3D%3D@kth.documents.azure.com:10255/?ssl=true", function (err, client) {
//   client.close();
// });

//var port = process.env.DEV || 8080;

// MongoDB Schema Model
var user = require('./models/user');
var customer = require('./models/customer');
var dailycollection = require('./models/collection');
var newvoucher = require('./models/newvoucher');
var returnitem = require('./models/returnitem');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'build')));

//To prevent errors from Cross Origin Resource Sharing, we will set 
//our headers to allow CORS with middleware like so:
// app.use(function (req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     // res.setHeader('Access-Control-Allow-Credentials', 'true');
//     res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
//     //and remove cacheing so we get the most recent
//     res.setHeader('Cache-Control', 'no-cache');
//     next();
// });



router.get('/', function (req, res) {
    res.send({ message: 'API Initialized!' });
    console.log('Api initialized');
});


/**
 *  Authentication Router Path
 */
router.route('/auth')
    .post(function (req, res) {

        var User = new user();

        user.findOne({ username: req.body.username }, function (err, user) {
            if (err) res.send(err);

            if (user !== null) {
                let hashPwd = user.password;
                var comparePwd = User.validPassword(req.body.password, hashPwd);
                if (comparePwd) {
                    res.json(user);
                } else res.json(null);
            } else res.json(null);

        })

    });

/**
 *  Check User Existing
 */

router.route('/checkuser')
    .post(function (req, res) {
        var userdata;
        user.findOne({ username: req.body.username }, function (err, data) {
            if (err) res(err);

            if (data !== null) {
                res.json(data);
            } else {
                /**
                 * Check User Email already exist or not
                 */

                user.findOne({ email: req.body.email }, function (err, data) {
                    if (err) res(err);

                    res.json(data);
                })
            }

        })

    });

router.route('/checkemail')
    .post(function (req, res) {

        user.findOne({ email: req.body.email }, function (err, data) {
            if (err) res(err);

            res.json(data);
        })

    });

/***
 * Home Page Api Routes
 */

router.route('/home/topten')
    .get(function (req, res) {
        var query = customer.find({}).sort({ salesamount: -1 }).limit(10);

        query.exec(function (err, data) {
            if (err) res.send(err);

            res.json(data);
        })
    });
/**
 * Sales Board API
 */

/**
* Charts API Router
*/

router.route('/charts/thisyear')
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

router.route('/home/yearly/totalsales')
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

router.route('/home/monthly/totalsales')
    .post(function (req, res) {
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
                "$match": { "salesmonth": parseInt(req.body.currentmonth) }
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

router.route('/home/topselling')
    .post(function (req, res) {
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
                    "salesmonth": parseInt(req.body.currentmonth)
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

/**
 * Return Board API     
 */

/**
* Charts API Router
*/

router.route('/return/charts/thisyear')
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

router.route('/home/monthly/totalreturn')
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
                    "returnmonth": parseInt(req.body.currentmonth)
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


router.route('/home/yearly/totalreturn')
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
router.route('/home/mostreturn')
    .post(function (req, res) {
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
                    "returnmonth": parseInt(req.body.currentmonth)
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

/**
 * User Api Routes
 */
router.route('/users')
    .get(function (req, res) {
        user.aggregate([{
            "$project": {
                "fullname": "$fullname",
                "username": "$username",
                "email": "$email",
                "userType": "$userType"
            }
        }], function (err, data) {
            if (err) res.send(err);

            res.json(data);
        }
        )

    })
    .post(function (req, res) {
        var User = new user();
        var hashpwd = User.generateHash(req.body.password);

        User.fullname = req.body.fullname;
        User.email = req.body.email;
        User.username = req.body.username;
        User.password = hashpwd;
        User.userType = req.body.userType;
        User.createDate = req.body.createDate;

        User.save(function (err) {
            if (err)
                res.send(err);
            res.json({ message: 'Successfully added!' });
        });
    })
    .delete(function (req, res) {
        user.deleteOne({ _id: req.body.userid }, function (err, data) {
            if (err) res.send(err)

            res.json({ message: 'Successfully delete!' });
        })
    });

router.route('/users/noteq')
    .post(function (req, res) {
        user.find({ _id: { $ne: req.body.id } }, function (err, users) {
            if (err)
                res.send(err);

            res.json(users);

        });
    })

/**
 * Update Password
 */
router.route('/resetpassword')
    .put(function (req, res) {
        var User = new user();
        var hashpwd = User.generateHash(req.body.password);

        user.findOne({ email: req.body.email }, function (err, data) {
            if (err) res.send(err);

            User.password = hashpwd;
            User.save(function (err) {
                if (err) res.send(err);

                res.json({ message: 'Password Successfully Updated!' });
            })
        })
    });

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
        var query = newvoucher.find({ customerid: req.body.customerid }).sort({ voucherdate: -1 }).limit(6);
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


/**
 * Route For Daily Collection
 */
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
                    "voucherno": "$voucherno"
                }
            },
            {
                "$match": {
                    "customerid": req.body.customerid
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
                    "itemno": "$itemno"
                }
            },
            {
                "$match": {
                    "customerid": req.body.customerid,
                    "voucherno": req.body.voucherno
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


app.use('/api', router);

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

//starts the server and listens for requests
var server = app.listen(process.env.PORT || 5000, function () {
    var port = server.address().port;
    console.log('api now running on port', port);
});

// app.listen(9000);