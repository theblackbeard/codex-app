"use strict";

const User = require('../user.js')
,     JWT = require('jsonwebtoken')
,     config = require('../../config/config.js')
,     passport = require('passport');

exports.init = (req, res, next, id) => {
  User.findById(id, (err, user) => {
    if(err){
      next(err);
    }else if(user){
      req.user = user;
      next();
    }else{
      next(new Error('failed to load user'));
    }
  })
}

exports.index = (req, res) => {
  User.find({}, (err, users) => {
      if(err) console.log(err);
      if(users.length > 0) return res.json({success: true, users: users})
      else return res.json({success: false, users: 0})
  });
}

exports.show = (req, res) => {
  return res.json({success: true, result: req.user});
}

exports.add = (req, res) => {
  User.create(req.body, (err, result) => {
     if(err) return res.json({success: false, result: err.errors})
     return res.json({success: true, result: result});
  })
}

exports.edit = (req, res) => {
  User.update(req.user, req.body, (err, user) => {
      if(err) return res.json(err);
      return res.json(user);
  });
}


exports.remove = (req, res) => {
  User.remove({_id: req.user._id}, (err, result) => {
      if(err) return res.json(err);
      return res.json(result);
  })
}

exports.auth = (req, res) => {
  User.findOne({
      email: req.body.email
  }, (err, user) => {
    if(err) console.log(err);
    if(!user) return res.json({success: false, result: 'Falha na autenticação, usuario não existe'});
    else{
      user.comparePassword(req.body.password, (err, isMatch) => {
         if(isMatch && !err){
           let token = JWT.sign(user, config.c.SECRET, { expiresIn: '24h'});
           return res.json({'success': true, token: 'JWT ' + token});
         }else{
             return res.json({success: false, result: 'Falha na autenticação, senha incorreta'});
         }
      });
    }
  });
};

exports.profile = (req, res) => {
   const token = _getToken(req.headers);
  if(token){
   JWT.verify(token, config.c.SECRET, function(err, profileInfo) {
      if(profileInfo !== undefined) return res.json({success: true, profile: profileInfo._doc});
      else return res.status(403).json({status: false, msg: 'Token inválido ou vencido'});
    });
  }else{
    return res.json({success: false, profile: 0})
  }
};


exports.userExists = (req, res) => {
  User.count({email: req.query.email}, (err, count) => {
    if(err) console.log(err);
    if(count > 0) return res.json(true)
    else return res.json(false);
  })

}

let _getToken = function(headers){
    if(headers && headers.authorization){
        var parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};
