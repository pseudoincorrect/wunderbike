  // const Router = require('express').Router();
import * as express from 'express';
const router = express.Router();
import {UserController} from "../controllers/user"
const user = new UserController()

// Router.post('/login', user.login);
router.post('/register', user.register);
// .post('/delete', user.delete)
// .post('/edit', user.edit)
// .get('/detail/:id', user.detail)
// .get('/logout', user.logout);

export {router};
