import RepliesHandler from './handler.js';
import createReplyRouter from './routes.js';

export default (container) => {
  const replyHandler = new RepliesHandler(container);
  return createReplyRouter(replyHandler);
};
