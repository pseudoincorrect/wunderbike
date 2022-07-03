import Debug from 'debug';
const debug = Debug('app:database:posts');
import { fromDbToModel, Post } from '../models/post';
import { pool } from '../libs/db';
const encryptPassword = require('../libs/secret').encryptPassword;

const table = 'posts';

/**
 * Class to manage the access to Posts in database
 */
class PostsAccess {
  /**
   * Add a post to the DB
   * @param post model
   * @returns a post models
   */
  async add(post: Post): Promise<Post> {
    let postVal = [post.title, post.description, post.userId, post.imageUrl];
    let res: any;
    try {
      res = await pool.query(
        'INSERT INTO ' +
          table +
          ' (title, description, user_id, image_url)' +
          ' VALUES ($1, $2, $3, $4)' +
          ' RETURNING *',
        postVal
      );
    } catch (error: any) {
      debug(error);
      throw error;
    }
    const row = res.rows[0];
    let postModel;
    try {
      postModel = fromDbToModel(row);
    } catch (error) {
      debug(error);
      throw 'Could not save post';
    }
    return postModel;
  }

  /**
   * Get a post from DB by ID
   * @param id post Id
   * @returns a post model
   */
  async getById(id: string): Promise<Post> {
    let res;
    try {
      res = await pool.query(
        'SELECT * from ' + table + ' WHERE id = ($1)::uuid',
        [id]
      );
    } catch (error: any) {
      debug(error);
      throw error;
    }
    const row = res.rows[0];
    let postModel;
    try {
      postModel = fromDbToModel(row);
    } catch (error) {
      debug(error);
      throw 'Could not save post';
    }
    return postModel;
  }

  /**
   * Get all posts from DB
   * @returns an array of post model
   */
  async getAll(): Promise<Post[]> {
    let res;
    try {
      res = await pool.query('SELECT * from ' + table);
    } catch (error: any) {
      debug(error);
      throw error;
    }
    const rows = res.rows;
    let postModels: Post[] = [];
    rows.forEach((r) => {
      let postModel: Post;
      try {
        postModel = fromDbToModel(r);
      } catch (error) {
        debug(error);
        throw 'Could not save post';
      }
      postModels.push(postModel);
    });
    return postModels;
  }

  /**
   * Delete a post from DB by ID
   * @param id post ID
   * @returns whether the post has been deleted
   */
  async delete(id: string): Promise<boolean> {
    let res;
    try {
      res = await pool.query(
        'DELETE from ' + table + ' WHERE id  = $1 RETURNING *',
        [id]
      );
    } catch (error: any) {
      debug(error);
      throw error;
    }
    if (res.rows.length == 1) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Update a post from DB and return it
   * @param post post model
   * @returns a post model
   */
  async update(post: Post): Promise<Post> {
    let postVal = [post.title, post.description, post.imageUrl, post.id];
    let res;
    try {
      res = await pool.query(
        'UPDATE ' +
          table +
          ' SET' +
          ' title = $1,' +
          ' description = $2,' +
          ' image_url = $3' +
          ' WHERE id = $4' +
          ' RETURNING *',
        postVal
      );
    } catch (error: any) {
      debug(error);
      throw error;
    }
    const row = res.rows[0];

    let postModel;
    try {
      postModel = fromDbToModel(row);
    } catch (error) {
      debug(error);
      throw 'Could not update post';
    }
    return postModel;
  }
}

export { PostsAccess };
