class ToggleLikeCommentUseCase {
  constructor({ threadRepository, commentRepository, commentLikeRepository }) {
    this._threadRepository = threadRepository;
    this._commentRepository = commentRepository;
    this._commentLikeRepository = commentLikeRepository;
  }

  async execute(userId, useCasePayload) {
    const { threadId, commentId } = useCasePayload;

    await this._threadRepository.verifyAvailableThread(threadId);
    await this._commentRepository.verifyAvailableComment(threadId, commentId);

    const like = await this._commentLikeRepository.isCommentLikedByUser(
      userId,
      commentId,
    );

    if (like.length > 0) {
      await this._commentLikeRepository.deleteLike(userId, commentId);
      return false;
    }
    await this._commentLikeRepository.addLike(userId, commentId);
    return true;
  }
}

export default ToggleLikeCommentUseCase;
