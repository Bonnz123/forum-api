import ThreadsHandler from './handler.js';
import createThreadRouter from './routes.js';

export default (container) => {
  const threadHandler = new ThreadsHandler(container);
  return createThreadRouter(threadHandler);
};
