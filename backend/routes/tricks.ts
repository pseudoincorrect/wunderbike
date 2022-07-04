import * as express from 'express';

import { TricksController } from '../controllers/tricks';

const router = express.Router();
const tricks = new TricksController();

router
  .post('/', tricks.add.bind(tricks))
  .get('/all', tricks.getAll.bind(tricks))
  .get('/:id', tricks.getById.bind(tricks))
  .put('/:id', tricks.update.bind(tricks))
  .delete('/:id', tricks.delete.bind(tricks));

export { router };
