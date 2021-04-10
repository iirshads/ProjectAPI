var express = require('express');
var router = express.Router();
var sql = require("mssql");
var conn = require("../connection/connect")();
var data = []



var routes = function () {


    router.route('/getall')
        .get(function (req, res) {

            console.log("TEst in ")
            conn.connect().then(function () {

                
                var sqlQuery = "SELECT * FROM Event_details";
               // console.log("sqlQuery")
                var req = new sql.Request(conn);
                req.query(sqlQuery).then(function (recordset) {
                    res.json(recordset);
                    conn.close();
                })
                    .catch(function (err) {
                        conn.close();
                        res.status(400).send("Error while getting data 1", err);
                    });
            })
                .catch(function (err) {
                    conn.close();
                    res.status(400).send("Error while getting data 2", err);
                });
        });





    router.route('/searchx')
        .post(function (req, res) {

            conn.connect().then(function () {
                var transaction = new sql.Transaction(conn);
                transaction.begin().then(function () {
                    var request = new sql.Request(transaction);

                    request.input("lat", sql.VarChar(50), req.body.lat)
                    request.input("long", sql.VarChar(50), req.body.long)

                    request.execute("Usp_search").then(function () {
                        transaction.commit().then(function (recordSet) {
                            console.log("123,",recordSet);
                                res.json(recordset);
                                conn.close();
                                
                        }).catch(function (err) {
                            console.log("1253,",err);
                                conn.close();
                                res.status(400).send("Error while getting data");
                            });
                        }).catch(function (err) {
                            conn.close();
                            res.status(400).send("Error while getting data");
                        });
                    }).catch(function (err) {
                        conn.close();
                        res.status(400).send("Error while getting data");
                    });
                }).catch(function (err) {
                    conn.close();
                    res.status(400).send("Error while inserting data");
                });
            });



    router.route('/search')
        .get(function (req, res) {

            console.log(req)
            var _lat = req.query.lat;
            var _long = req.query.long;

            console.log(_lat, "::", _long)
            conn.connect().then(function () {

                //3.
                var request = new sql.Request(conn);
                request.input("lat", sql.VarChar(50), _lat)
                request.input("long", sql.VarChar(50), _long)
                    .execute("Usp_search").then(function (recordset) {
                        //4.
                        ///console.log(recordset);
                        res.json(recordset);
                       
                        conn.close();
                    }).catch(function (err) {
                        //5.
                        console.log(err);
                        conn.close();
                    });
            }).catch(function (err) {
                //6.
                console.log(err);
            });
        });






    router.route('/add')
        .post(function (req, res) {

  
            conn.connect().then(function () {
                var transaction = new sql.Transaction(conn);
                transaction.begin().then(function () {
                    var request = new sql.Request(transaction);

                                request.input("EventTitle", sql.VarChar(50), req.body.EventTitle)
                                request.input("EventDate", sql.VarChar(50), req.body.EventDate)
                                request.input("Address", sql.VarChar(500), req.body.Address)
                                request.input("lat", sql.VarChar(50), req.body.lat)
                                request.input("long", sql.VarChar(50), req.body.long)

                                request.execute("Usp_InsertEvent").then(function () {
                                    transaction.commit().then(function (recordSet) {
                                  
                            conn.close();
                            res.status(200).send(req.body);
                        }).catch(function (err) {
                            conn.close();
                            res.status(400).send("Error while inserting data");
                        });
                    }).catch(function (err) {
                        conn.close();
                        res.status(400).send("Error while inserting data");
                    });
                }).catch(function (err) {
                    conn.close();
                    res.status(400).send("Error while inserting data");
                });
            }).catch(function (err) {
                conn.close();
                res.status(400).send("Error while inserting data");
            });
        });


    return router;
};
module.exports = routes;