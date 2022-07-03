import * as express from 'express';
const router = express.Router();
import { PostsController } from '../controllers/posts';
const posts = new PostsController();

router
  .post('/', posts.add.bind(posts))
  .get('/all', posts.getAll.bind(posts))
  .get('/:id', posts.getById.bind(posts))
  .put('/:id', posts.update.bind(posts))
  .delete('/:id', posts.delete.bind(posts));

export { router };
