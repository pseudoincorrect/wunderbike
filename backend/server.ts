import Debug from "debug";
const debug = Debug("app:server");

const app = require('express')();
const server = require('http').Server(app);
import bodyParser from 'body-parser';
import {router} from './routes/user';
// const config = require(CONFIG_FILE_PATH);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  // console.log('Server Started. *:%o', PORT);
  debug('Server Started. *:%o', PORT);
});

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// const index = require('./routes/index.js');

// app.use('/', index);
app.use('/users', router);

// Error Middleware
app.use(require('./libs/error.js'));
