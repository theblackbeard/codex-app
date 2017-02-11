"use strict";

const Prime = require('../prime.js')

exports.init = (req, res, next, id) => {
  Prime.findById(id, (err, prime) => {
    if(err){
      next(err);
    }else if(prime){
      req.prime = prime;
      next();
    }else{
      next(new Error('failed to load Prime Item'));
    }
  })
}

exports.index = (req, res) => {
  Prime.find({}, (err, primes) => {
      if(err) console.log(err);
      if(primes.length > 0) return res.json({success: true, primes: primes})
      else return res.json({success: false, primes: 0})
  });
}

exports.show = (req, res) => {
    return res.json({success: true, prime: req.prime})
}

exports.add = (req, res) => {
   Prime.create(req.body, (err, result) => {
     if(err) return res.json(err);
      return res.json(result);
   });
}

exports.edit = (req, res) => {
  Prime.update(req.prime, req.body,(err, result) => {
    if(err) return res.json(err);
     return res.json(result);
  } )
}

exports.remove = (req, res) => {
  Prime.remove({_id: req.prime._id}, (err, result) => {
      if(err) return res.json(err);
      return res.json(result);
  })
}

exports.getFromSearch = (req, res) => {
 Prime.find({}, (err, primes) => {
    if(err) console.log(err);
    if(primes.length > 0) return res.json({success: true, primes: primes});
    else return res.json({success: false, primes: 0})*/

 })

}
