"use strict";
const mongodb = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const config = require('./config');

MongoClient.connect(config.c.MONGO + config.c.MONGODB , (err, database) => {
        if(err) throw err;
        console.log("Database Connected");
        exports.db = database;
});





