import ToggleLikeCommentUseCase from '../../../../Applications/use_case/ToggleLikeCommentUseCase.js';

class CommentLikeHandler {
  constructor(container) {
    this._container = container;

    this.toggleLikeCommentHandler = this.toggleLikeCommentHandler.bind(this);
  }

  async toggleLikeCommentHandler(req, res, next) {
    try {
      const { id: userId } = req.user;
      const { threadId, commentId } = req.params;

      const toggleLikeCommentUseCase = this._container.getInstance(
        ToggleLikeCommentUseCase.name,
      );

      await toggleLikeCommentUseCase.execute(userId, {
        threadId,
        commentId,
      });

      res.status(200).json({
        status: 'success',
      });
    } catch (error) {
      next(error);
    }
  }
}

export default CommentLikeHandler;
