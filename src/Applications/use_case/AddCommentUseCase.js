import AddComment from '../../Domains/comments/entities/AddComment.js';

class AddCommentUseCase {
  constructor({ threadRepository, commentRepository }) {
    this._threadRepository = threadRepository;
    this._commentRepository = commentRepository;
  }

  async execute(userId, useCasePayload) {
    const { threadId, content } = useCasePayload;

    const addComment = new AddComment({ content });

    await this._threadRepository.verifyAvailableThread(threadId);

    return await this._commentRepository.addComment({
      userId,
      threadId,
      content: addComment.content,
    });
  }
}

export default AddCommentUseCase;
