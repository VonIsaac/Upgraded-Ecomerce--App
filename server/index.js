const http = require('http');

const express = require('express')

const app = express()

app.use((req, res, next) => {
    console.log('HELLO EXPRESS AGAIn')
})

const server = http.createServer(app)


server.listen(3308);