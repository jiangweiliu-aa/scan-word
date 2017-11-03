const config = require('./config.local')

module.exports = Object.assign({
    port: 8090,
    dev: false
}, config)