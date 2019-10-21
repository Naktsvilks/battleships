// const http = require('http');

// http.createServer((request, response) => {
//     response.writeHead(200, { 'Content-Type': 'text/plain' });
//     response.write('Hello world!');
//     response.end();
//     console.log('log');
// }).listen(3000);

const express = require('express');
const parser = require('body-parser');

const app = express();
app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));

const hello = require('./app');

app.route('/')
    .get(hello.bunny)
    .post((request, res) => {
        res.send(request.body);
        console.log(request.body);
    });

app.route('/thingy').post(hello.thingy);

app.listen(3000);
