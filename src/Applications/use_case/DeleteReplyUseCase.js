class DeleteReplyUseCase {
  constructor({ threadRepository, commentRepository, replyRepository }) {
    this._threadRepository = threadRepository;
    this._commentRepository = commentRepository;
    this._replyRepository = replyRepository;
  }

  async execute(userId, useCasePayload) {
    const { threadId, commentId, replyId } = useCasePayload;

    await this._threadRepository.verifyAvailableThread(threadId);

    await this._commentRepository.verifyAvailableComment(threadId, commentId);

    await this._replyRepository.verifyReplyAccess({
      userId,
      commentId,
      replyId,
    });

    return await this._replyRepository.softDeleteReply({
      replyId,
      content: '**balasan telah dihapus**',
      is_delete: true,
    });
  }
}

export default DeleteReplyUseCase;
