const express = require('express')
const http = require('http')
const webpack = require('webpack')
const webpackConfig = require('./webpack.config')
const compiler = webpack(webpackConfig)
const config = require('./config')
const fs = require('fs')

const app = express()
// app.use(require('webpack-dev-middleware')(compiler, {
//     noInfo: true,
//     publicPath: webpackConfig.output.publicPath,
// }));
// app.use(require('webpack-hot-middleware')(compiler));

const server = new http.Server(app);
const io = require('socket.io')(server)

const PORT = process.env.PORT || config.port;
server.listen(PORT)

io.on('connection', (socket) => {
    console.log('server side socket already connected...')
    socket.on('socket:connected', info => {
        console.log('server side log:', info)
    })
    fs.watch('./dist/', {
        recursive: true,
    }, () => {
        socket.emit('file.change')
    })
})