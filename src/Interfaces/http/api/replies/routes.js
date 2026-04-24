import express from 'express';

const createReplyRouter = (handler) => {
  const router = express.Router({ mergeParams: true });

  router.post('/', handler.postReplyHandler);
  router.delete('/:replyId', handler.deleteReplyHandler);

  return router;
};

export default createReplyRouter;
