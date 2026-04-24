import AddCommentUseCase from '../../../../Applications/use_case/AddCommentUseCase.js';
import DeleteCommentUseCase from '../../../../Applications/use_case/DeleteCommentUseCase.js';

class CommentsHandler {
  constructor(container) {
    this._container = container;

    this.postCommentHandler = this.postCommentHandler.bind(this);
    this.deleteCommentHandler = this.deleteCommentHandler.bind(this);
  }

  async postCommentHandler(req, res, next) {
    try {
      const { id: userId } = req.user;
      const threadId = req.params.threadId;
      const addCommentUseCase = this._container.getInstance(
        AddCommentUseCase.name,
      );
      const addedComment = await addCommentUseCase.execute(userId, {
        threadId,
        ...req.body,
      });

      res.status(201).json({
        status: 'success',
        data: {
          addedComment,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteCommentHandler(req, res, next) {
    try {
      const { id: userId } = req.user;
      const { threadId, commentId } = req.params;
      const deleteCommentUseCase = this._container.getInstance(
        DeleteCommentUseCase.name,
      );
      await deleteCommentUseCase.execute(userId, { threadId, commentId });

      res.status(200).json({
        status: 'success',
      });
    } catch (error) {
      next(error);
    }
  }
}

export default CommentsHandler;
