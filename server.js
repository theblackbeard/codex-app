"use strict";

const
    express = require('express')
,   morgan = require('morgan')
,   parser = require('body-parser')
,   http = require('http')
,   passport = require('passport')
,   routes = require('./config/routes')
,   config = require('./config/config')
,   app = express();

require('./config/database-mongoose')(config.c);
require('./config/middleware/local-passport');

app.use(parser.urlencoded({ extended: false }));
app.use(parser.json());
app.use(morgan('dev'));
app.use('/api', routes);

app.use(passport.initialize());
app.listen(config.c.PORTSERVER, config.c.IPSERVER, () => {
    console.log('Listening on port ' + config.c.PORTSERVER);
});

