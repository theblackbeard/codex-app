"use strict";
const
    mongoose = require('mongoose')
,   Schema = mongoose.Schema
,   uniqueValidator = require('mongoose-unique-validator')
,   bcrypt = require('bcrypt-nodejs')

,   saltNumber = 10;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        validate: {
            validator: function(v){
                return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v);
            },
            message: 'E-mail Inválido'
        },
        required: [true, 'Campo E-mail é requerido'],
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    last_login: {
        type : Date
    },

    created_at: {
        type: Date,
        default: Date.now
    }

    
});  

UserSchema.pre('save', function(next){
    let user = this;
    if(!user.isModified('password')) return next();
    bcrypt.genSalt(saltNumber, (err, salt) => {
        if(err) return next(err);
        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if(err) return next(err);
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(passw, cb){
    bcrypt.compare(passw, this.password, function(err, isMatch){
        if(err) return cb(err);
        cb(null, isMatch);
    });

};

UserSchema.plugin(uniqueValidator, { message: 'Erro: E-mail já existente.' });

module.exports = mongoose.model('User', UserSchema);
