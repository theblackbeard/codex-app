"use strict";
const
    mongoose = require('mongoose')
,   Schema = mongoose.Schema
,   uniqueValidator = require('mongoose-unique-validator')


const PrimeSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    photo: {
        type: String,
        default: "http://i.imgur.com/c00Aoc6.jpg"
    },

    items: {
      item_mastery: String,
      item_type: String,
      item_name: String,
      item_status: String,
      item_ducats: String
    },

    relics: [
      {
        relic_name: String,
        relic_type: String
      }
    ],

    drops: [
      {
        drop_relic: String,
        drop_planet: String,
        drop_name: String,
        drop_mission: String,
        drop_rotation: String
      }
    ],

    viwed: {type: Number, default: 0},
    
    created_at: {
        type: Date,
        default: Date.now
    }

});

PrimeSchema.plugin(uniqueValidator, { message: 'Erro: Item Prime já cadastrado.' });

module.exports = mongoose.model('Prime', PrimeSchema);
