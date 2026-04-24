import express from 'express';
import { authenticationMiddleware } from '../../middleware/authenticationMiddleware.js';

const createThreadRouter = (handler) => {
  const router = express.Router();

  router.get('/:threadId', handler.getThreadDetailsHandler);

  router.use(authenticationMiddleware);
  router.post('/', handler.postThreadHandler);

  return router;
};

export default createThreadRouter;
