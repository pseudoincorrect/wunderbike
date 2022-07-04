import bodyParser from 'body-parser';
import Debug from 'debug';
import { checkJwt } from './libs/auth';
import { errorMid } from './libs/error';
import { router as trickRouter } from './routes/tricks';

const express = require('express');
const http = require('http');
const debug = Debug('app:server');
const app = express();
const server = http.Server(app);
const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  debug('Server Started. *:%o', PORT);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// HealthCheck
app.get('/api/ping', (req: any, res: any) => {
  res.send('pong');
});

// All routes from here need to be authenticated
app.use(checkJwt);

// Authentication test route
app.get('/api/authenticated', (req: any, res: any) => {
  console.log(req.auth);
  res.json({ message: 'user ' + req.auth.sub + ' is authenticated' });
});

// Tricks related routes
app.use('/api/tricks', trickRouter);

app.use(errorMid);
