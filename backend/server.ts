import bodyParser from 'body-parser';
import Debug from 'debug';
import { checkJwt } from './libs/auth';
import { router } from './routes/posts';

const express = require('express');
const http = require('http');
const debug = Debug('app:server');
const app = express();
const server = http.Server(app);
const PORT = process.env.PORT || 3000;

function errorHandler(error: any, request: any, response: any, next: any) {
  console.log(`error ${error.message}`); // log the error
  const status = error.status || 400;
  response.status(status).send(error.message);
}

server.listen(PORT, () => {
  debug('Server Started. *:%o', PORT);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/public', (req: any, res: any) => {
  res.send('no need for auth here');
});

app.get('/authenticated', checkJwt, (req: any, res: any) => {
  console.log(req.auth);
  res.send('user is authenticated');
});

// All routes from here need to be authenticated
app.use(checkJwt);

app.use('/posts', router);

app.use(errorHandler);

// app.use(require('./libs/error.js'));
