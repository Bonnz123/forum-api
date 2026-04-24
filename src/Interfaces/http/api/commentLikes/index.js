import CommentLikeHandler from './handler.js';
import createCommentLikeRouter from './routes.js';

export default (container) => {
  const commentLikeHandler = new CommentLikeHandler(container);
  return createCommentLikeRouter(commentLikeHandler);
};
