"use strict";

const
    express = require('express')
,   passport = require('passport')
,   UserController = require('../app/controllers/user-controller')
,   PrimeController = require('../app/controllers/prime-controller')
,   Auth = require('./middleware/auth-main')
,   api = express.Router();

const rp = passport.authenticate('jwt', { session: false});
const ra = Auth.requireLogin;

api.use((req, res, next) => {
    console.log("Middleware of Routes");
    next();
});

/*USERS MANAGER */
api.param('userID', UserController.init);
api.get('/users', rp, UserController.index);
api.get('/users/:userID',rp, UserController.show);
api.post('/users/add', UserController.add);
api.post('/users/auth', UserController.auth);
api.post('/users/exists', UserController.userExists);
api.post('/users/profile', rp, UserController.profile);
api.put('/users/:userID/edit', ra,UserController.edit);
api.delete('/users/:userID/remove', ra, UserController.remove);

/*PRIME MANAGER */
api.param('primeID', PrimeController.init);
api.get('/primes', PrimeController.index);
api.get('/prime/:primeID', PrimeController.show);
api.get('/primes/search', PrimeController.getFromSearch);
api.post('/prime/add', PrimeController.add);
api.put('/prime/:primeID/edit', PrimeController.edit);
api.delete('/prime/:primeID/remove', PrimeController.remove);

module.exports = api;
