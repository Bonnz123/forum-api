import AddReply from '../../Domains/replies/entities/AddReply.js';

class AddReplyUseCase {
  constructor({ threadRepository, commentRepository, replyRepository }) {
    this._threadRepository = threadRepository;
    this._commentRepository = commentRepository;
    this._replyRepository = replyRepository;
  }

  async execute(userId, useCasePayload) {
    const { threadId, commentId, content } = useCasePayload;
    const addReply = new AddReply({ content });

    await this._threadRepository.verifyAvailableThread(threadId);

    await this._commentRepository.verifyAvailableComment(threadId, commentId);

    return await this._replyRepository.addReply({
      userId,
      threadId,
      commentId,
      content: addReply.content,
    });
  }
}

export default AddReplyUseCase;
