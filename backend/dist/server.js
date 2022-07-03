"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const debug_1 = __importDefault(require("debug"));
const auth_1 = require("./libs/auth");
const posts_1 = require("./routes/posts");
const express = require('express');
const http = require('http');
const debug = (0, debug_1.default)('app:server');
const app = express();
const server = http.Server(app);
const PORT = process.env.PORT || 3000;
function errorHandler(error, request, response, next) {
    console.log(`error ${error.message}`); // log the error
    const status = error.status || 400;
    response.status(status).send(error.message);
}
server.listen(PORT, () => {
    debug('Server Started. *:%o', PORT);
});
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.get('/public', (req, res) => {
    res.send('no need for auth here');
});
app.get('/authenticated', auth_1.checkJwt, (req, res) => {
    console.log(req.auth);
    res.send('user is authenticated');
});
// All routes from here need to be authenticated
app.use(auth_1.checkJwt);
app.use('/posts', posts_1.router);
app.use(errorHandler);
// app.use(require('./libs/error.js'));
