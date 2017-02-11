'use strict';
const path = require('path');
let _config = {
    'IPSERVER' : process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1',
    'PORTSERVER': process.env.OPENSHIFT_NODEJS_PORT || 8001,
    'MONGO': process.env.MONGODB_URL, // || 'mongodb://127.0.0.1:27017/',
    'MONGODB': 'codex',
    'ROOT' : path.join(__dirname, '..'),
    'SECRET': 'iknowthisisamazingsysteminnodejsmybabelol'
}
exports.c = _config;
