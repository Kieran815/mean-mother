var config = {};
config.mongodb = 'mongodb://localhost/mean-cms';

// session config from mongodb
config.session = {};

// cookie config from mongo
config.cookie = {};

// random session secret
config.session.secret = 'thx1138!lv271*'

// cookie domain
config.cookie.domain = 'localhost';

module.exports = config;