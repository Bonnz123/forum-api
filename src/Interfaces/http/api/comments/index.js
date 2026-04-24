import CommentsHandler from './handler.js';
import createCommentRouter from './routes.js';

export default (container) => {
  const commentHandler = new CommentsHandler(container);
  return createCommentRouter(commentHandler);
};
