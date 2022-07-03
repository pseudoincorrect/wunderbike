import Debug from 'debug';
import express from 'express';
import * as validation from 'validator';
const val = validation.default;
import * as httpErr from 'http-errors';

import { PostsAccess } from '../database/posts';
import { fromRequestToModel } from '../models/post';

const debug = Debug('app:controller:posts');
const posts = new PostsAccess();

class PostsController {
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
      let addedPosts = await posts.add(postModel);
      res.send({ status: 'created', post: addedPosts });
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
      return next(new httpErr.BadRequest('Invalid getById posts request'));
    }
    try {
      let model = await posts.getById(id);
      res.send({ post: model });
    } catch (e: any) {
      return next(new httpErr.InternalServerError('Cannot Get post '));
    }
  }

  /**
   * HTTP Handler to get all posts from data store
   */
  async getAll(req: any, res: any, next: any) {
    try {
      let models = await posts.getAll();
      res.send({ posts: models });
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
        new httpErr.BadRequest('Invalid id for Update posts request')
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
      model.id = id;
      debug(model);
      let updatedModel = await posts.update(model);
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
      return next(new httpErr.BadRequest('Invalid delete posts request'));
    }
    try {
      let postsModel = await posts.delete(id);
      res.send({ post_status: 'deleted', deleted_post: postsModel });
    } catch (e: any) {
      return next(new httpErr.InternalServerError('Cannot Delete post '));
    }
  }
} // PostsController class

export { PostsController };
