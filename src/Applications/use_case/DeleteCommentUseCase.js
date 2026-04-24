class DeleteCommentUseCase {
  constructor({ commentRepository, threadRepository }) {
    this._commentRepository = commentRepository;
    this._threadRepository = threadRepository;
  }

  async execute(userId, useCasePayload) {
    const { threadId, commentId } = useCasePayload;
    await this._threadRepository.verifyAvailableThread(threadId);

    await this._commentRepository.verifyCommentAccess({
      userId,
      threadId,
      commentId,
    });

    await this._commentRepository.softDeleteComment({
      commentId,
      content: '**komentar telah dihapus**',
      is_delete: true,
    });
  }
}

export default DeleteCommentUseCase;
