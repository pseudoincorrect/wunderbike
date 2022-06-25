import Debug from "debug";
const debug = Debug("app:controller:user");

import {UserAccess} from '../database/user';
const user = new UserAccess()

class UserController {
  // async showAllUser(req, res) {
  //   let users = (await userAccess.get()).rows;

  //   res.render('index', {
  //     users,
  //   });
  // }

  // async detail(req, res, next) {
  //   res.locals.edit = true;

  //   let id = req.params.id;

  //   debug('detail %o', id);

  //   try {
  //     let detail = (await userAccess.get(id)).rows[0];

  //     res.render('index', {
  //       userAccess: detail,
  //     });
  //   } catch (e) {
  //     next(e.detail || e);
  //   }
  // }

  // async edit(req, res, next) {
  //   let data = req.body;

  //   try {
  //     let result = await userAccess.edit(data);
  //     res.end('ok!');
  //   } catch (e) {
  //     next(e.detail || e);
  //   }
  // }

  // async login(req, res, next) {
  //   let username = req.body.username;
  //   let password = req.body.password;

  //   try {
  //     let result = await userAccess.login(username, password);
  //     req.session.userAccess = result.rows[0];
  //     res.redirect('/');
  //   } catch (e) {
  //     next(e.detail || e);
  //   }
  // }

  // async logout(req, res, next) {
  //   req.session = null;
  //   res.redirect('/');
  // }

  // async delete(req, res, next) {
  //   let id = req.body.id;

  //   try {
  //     let result = await userAccess.delete({ id });
  //     res.redirect('/');
  //   } catch (e) {
  //     next(e.detail);
  //   }
  // }

  async register(req: any, res: any, next: any) {
    let data = req.body;
    try {
      debug(data);
      let result = await user.register(data);
      debug(result);
      res.send('Hi! New User~');
    } catch (e) {
      next(e);
    }
  }
}



export {UserController};
