import express from 'express';

const createCommentLikeRouter = (handler) => {
  const router = express.Router({ mergeParams: true });

  router.put('/', handler.toggleLikeCommentHandler);

  return router;
};

export default createCommentLikeRouter;
