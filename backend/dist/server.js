"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debug = require('debug')('app:server');
const app = require('express')();
const server = require('http').Server(app);
const body_parser_1 = __importDefault(require("body-parser"));
const user_1 = require("./routes/user");
// const config = require(CONFIG_FILE_PATH);
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    // console.log('Server Started. *:%o', PORT);
    debug('Server Started. *:%o', PORT);
});
// Body Parser
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
// const index = require('./routes/index.js');
// app.use('/', index);
app.use('/users', user_1.router);
// Error Middleware
app.use(require('./libs/error.js'));
