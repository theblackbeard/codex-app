"use strict";
const
    mongoose = require('mongoose')
,   Schema = mongoose.Schema

const SeasonSchema = new Schema({
    episodes: 
    [
        {
            title: String,
            viwed: Boolean
        }
    ]

 
});

module.exports = mongoose.model('Season', SeasonSchema);
