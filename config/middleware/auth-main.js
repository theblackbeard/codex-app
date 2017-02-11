'use strict';

const JWT = require('jsonwebtoken');
const config = require('../config');
const User = require('../../app/user');


exports.requireLogin = (req, res, next)=> {
    let token = _getToken(req.headers);
    if(token){
        let decoded = _decodedThis(token, function(decoded){
           if(decoded === undefined || decoded === null) return res.status(403).send({success: false, msg: 'Token inválido ou vencido'});
           User.findById(decoded._id, {password: 0}, (err, user) => {
                if(err) console.log(err);
                if(!user){
                    return res.status(403).send({success: false, msg: 'Authentication failed. User not found'});
                }else{
                    return next();
                }
             })
        });
    }else{
        return res.status(403).send({success: false, msg: 'Authentication failed. No Token Provided'})
    }
};

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

let _decodedThis = function(_token, callback){
        setTimeout(function(){
        JWT.verify(_token, config.c.SECRET, function(err, userInfo){
            if(userInfo !== undefined){
                let _user = ({  _id: userInfo._doc._id,
                                name: userInfo._doc.name,
                                email: userInfo._doc.email
                            });
                callback(_user);
            }else{
                return callback(null);
            }
        });
        }, 1000);
}
