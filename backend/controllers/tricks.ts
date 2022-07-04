import Debug from 'debug';
import * as httpErr from 'http-errors';
import * as validation from 'validator';

import { TricksAccess } from '../database/tricks';
import { fromRequestToModel } from '../models/trick';

const val = validation.default;
const debug = Debug('app:controller:tricks');
const tricks = new TricksAccess();

class TricksController {
  /**
   * validate an object containing the data to create a post model
   * @param data object containing post model data
   * @returns if it is valid
   */
  private modelRequestIsValid(data: any): boolean {
    if (
      !val.isLength(data.title, { min: 3, max: 64 }) ||
      !val.isLength(data.description, { min: 10, max: 500 }) ||
      !val.isURL(data.imageUrl)
    ) {
      return false;
    }
    return true;
  }

  /**
   * HTTP handler to add a post into data store
   */
  async add(req: any, res: any, next: any) {
    let data = req.body;
    if (!this.modelRequestIsValid(data)) {
      return next(new httpErr.BadRequest('Invalid Add post request'));
    }
    try {
      let postModel = fromRequestToModel(data);
      postModel.userId = req.auth.sub;
      debug('postModel', postModel);
      let addedTricks = await tricks.add(postModel);
      res.send({ status: 'created', post: addedTricks });
    } catch (e) {
      return next(new httpErr.InternalServerError('Cannot Add post '));
    }
  }

  /**
   * Validate a post ID string
   * @param id post ID
   * @returns whether it is a valid ID
   */
  private byIdRequestIsValid(id: string): boolean {
    if (!val.isLength(id, { min: 10, max: 64 })) {
      return false;
    }
    return true;
  }

  /**
   * HTTP handler to get a post by its ID from data store
   */
  async getById(req: any, res: any, next: any) {
    let id = req.params.id;
    if (!this.byIdRequestIsValid(id)) {
      return next(new httpErr.BadRequest('Invalid getById tricks request'));
    }
    try {
      let model = await tricks.getById(id);
      res.send({ post: model });
    } catch (e: any) {
      return next(new httpErr.InternalServerError('Cannot Get post '));
    }
  }

  /**
   * HTTP Handler to get all tricks from data store
   */
  async getAll(req: any, res: any, next: any) {
    try {
      let models = await tricks.getAll();
      res.send({ tricks: models });
    } catch (e: any) {
      return next(new httpErr.InternalServerError('Cannot Get All post '));
    }
  }
  /**
   * HTTP handler to update a post
   */
  async update(req: any, res: any, next: any) {
    let id = req.params.id;
    if (!this.byIdRequestIsValid(id)) {
      return next(
        new httpErr.BadRequest('Invalid id for Update tricks request')
      );
    }
    let data = req.body;
    if (!this.modelRequestIsValid(data)) {
      return next(
        new httpErr.BadRequest('Invalid data for Update post request')
      );
    }
    try {
      let model = fromRequestToModel(data);
      model.id = data.id;
      debug(model);
      let updatedModel = await tricks.update(model);
      res.send({
        post_status: 'updated',
        old_post: model,
        new_post: updatedModel,
      });
    } catch (e: any) {
      return next(new httpErr.InternalServerError('Cannot Update post '));
    }
  }

  /**
   * HTTP Handler to delete a post from data store
   */
  async delete(req: any, res: any, next: any) {
    let id = req.params.id;
    if (!this.byIdRequestIsValid(id)) {
      return next(new httpErr.BadRequest('Invalid delete tricks request'));
    }
    try {
      let tricksModel = await tricks.delete(id);
      res.send({ post_status: 'deleted', deleted_post: tricksModel });
    } catch (e: any) {
      return next(new httpErr.InternalServerError('Cannot Delete post '));
    }
  }
} // TricksController class

export { TricksController };
