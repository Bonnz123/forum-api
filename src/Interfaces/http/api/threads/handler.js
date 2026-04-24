import AddThreadUseCase from '../../../../Applications/use_case/AddThreadUseCase.js';
import GetThreadDetailsUseCase from '../../../../Applications/use_case/GetThreadDetailsUseCase.js';

class ThreadsHandler {
  constructor(container) {
    this.container = container;
    this.postThreadHandler = this.postThreadHandler.bind(this);
    this.getThreadDetailsHandler = this.getThreadDetailsHandler.bind(this);
  }

  async postThreadHandler(req, res, next) {
    try {
      const { id: userId } = req.user;
      const addThreadUseCase = this.container.getInstance(
        AddThreadUseCase.name,
      );
      const addedThread = await addThreadUseCase.execute(userId, req.body);

      res.status(201).json({
        status: 'success',
        data: {
          addedThread,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async getThreadDetailsHandler(req, res, next) {
    try {
      const { threadId } = req.params;
      const getThreadDetailsUseCase = this.container.getInstance(
        GetThreadDetailsUseCase.name,
      );
      const thread = await getThreadDetailsUseCase.execute(threadId);

      res.status(200).json({
        status: 'success',
        data: {
          thread,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

export default ThreadsHandler;
