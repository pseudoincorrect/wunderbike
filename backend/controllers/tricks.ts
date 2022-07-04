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
   * validate an object containing the data to create a trick model
   * @param data object containing trick model data
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
   * HTTP handler to add a trick into data store
   */
  async add(req: any, res: any, next: any) {
    let data = req.body;
    if (!this.modelRequestIsValid(data)) {
      return next(new httpErr.BadRequest('Invalid Add trick request'));
    }
    try {
      let trickModel = fromRequestToModel(data);
      trickModel.userId = req.auth.sub;
      debug('trickModel', trickModel);
      let addedTricks = await tricks.add(trickModel);
      res.send({ status: 'created', trick: addedTricks });
    } catch (e) {
      return next(new httpErr.InternalServerError('Cannot Add trick '));
    }
  }

  /**
   * Validate a trick ID string
   * @param id trick ID
   * @returns whether it is a valid ID
   */
  private byIdRequestIsValid(id: string): boolean {
    if (!val.isLength(id, { min: 10, max: 64 })) {
      return false;
    }
    return true;
  }

  /**
   * HTTP handler to get a trick by its ID from data store
   */
  async getById(req: any, res: any, next: any) {
    let id = req.params.id;
    if (!this.byIdRequestIsValid(id)) {
      return next(new httpErr.BadRequest('Invalid getById tricks request'));
    }
    try {
      let model = await tricks.getById(id);
      res.send({ trick: model });
    } catch (e: any) {
      return next(new httpErr.InternalServerError('Cannot Get trick '));
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
      return next(new httpErr.InternalServerError('Cannot Get All trick '));
    }
  }
  /**
   * HTTP handler to update a trick
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
        new httpErr.BadRequest('Invalid data for Update trick request')
      );
    }
    try {
      let model = fromRequestToModel(data);
      model.id = id;
      debug(model);
      let updatedModel = await tricks.update(model);
      res.send({
        trick_status: 'updated',
        old_trick: model,
        new_trick: updatedModel,
      });
    } catch (e: any) {
      return next(new httpErr.InternalServerError('Cannot Update trick '));
    }
  }

  /**
   * HTTP Handler to delete a trick from data store
   */
  async delete(req: any, res: any, next: any) {
    let id = req.params.id;
    if (!this.byIdRequestIsValid(id)) {
      return next(new httpErr.BadRequest('Invalid delete tricks request'));
    }
    try {
      let tricksModel = await tricks.delete(id);
      res.send({ trick_status: 'deleted', deleted_trick: tricksModel });
    } catch (e: any) {
      return next(new httpErr.InternalServerError('Cannot Delete trick '));
    }
  }
} // TricksController class

export { TricksController };
