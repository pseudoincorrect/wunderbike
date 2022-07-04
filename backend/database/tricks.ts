import Debug from 'debug';

import { pool } from '../libs/db';
import { fromDbToModel, Trick } from '../models/trick';

const debug = Debug('app:database:tricks');
const table = 'tricks';

/**
 * Class to manage the access to Trick in database
 */
class TricksAccess {
  /**
   * Add a trick to the DB
   * @param trick model
   * @returns a trick models
   */
  async add(trick: Trick): Promise<Trick> {
    let trickVal = [
      trick.title,
      trick.description,
      trick.userId,
      trick.imageUrl,
    ];
    let res: any;
    try {
      res = await pool.query(
        'INSERT INTO ' +
          table +
          ' (title, description, user_id, image_url)' +
          ' VALUES ($1, $2, $3, $4)' +
          ' RETURNING *',
        trickVal
      );
    } catch (error: any) {
      debug(error);
      throw error;
    }
    const row = res.rows[0];
    let trickModel;
    try {
      trickModel = fromDbToModel(row);
    } catch (error) {
      debug(error);
      throw 'Could not save trick';
    }
    return trickModel;
  }

  /**
   * Get a trick from DB by ID
   * @param id trick Id
   * @returns a trick model
   */
  async getById(id: string): Promise<Trick> {
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
    let trickModel;
    try {
      trickModel = fromDbToModel(row);
    } catch (error) {
      debug(error);
      throw 'Could not save trick';
    }
    return trickModel;
  }

  /**
   * Get all tricks from DB
   * @returns an array of trick model
   */
  async getAll(): Promise<Trick[]> {
    let res;
    try {
      res = await pool.query('SELECT * from ' + table);
    } catch (error: any) {
      debug(error);
      throw error;
    }
    const rows = res.rows;
    let trickModels: Trick[] = [];
    rows.forEach((r) => {
      let trickModel: Trick;
      try {
        trickModel = fromDbToModel(r);
      } catch (error) {
        debug(error);
        throw 'Could not save trick';
      }
      trickModels.push(trickModel);
    });
    return trickModels;
  }

  /**
   * Delete a trick from DB by ID
   * @param id trick ID
   * @returns whether the trick has been deleted
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
   * Update a trick from DB and return it
   * @param trick trick model
   * @returns a trick model
   */
  async update(trick: Trick): Promise<Trick> {
    let trickVal = [trick.title, trick.description, trick.imageUrl, trick.id];
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
        trickVal
      );
    } catch (error: any) {
      debug(error);
      throw error;
    }
    const row = res.rows[0];

    let trickModel;
    try {
      trickModel = fromDbToModel(row);
    } catch (error) {
      debug(error);
      throw 'Could not update trick';
    }
    return trickModel;
  }
}

export { TricksAccess };
