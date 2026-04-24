class CommentRepository {
  async addComment({ _userId, _threadId, _content }) {
    throw new Error('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async verifyCommentAccess({ _userId, _threadId, _commentId }) {
    throw new Error('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async verifyAvailableComment(_threadId, _commentId) {
    throw new Error('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async softDeleteComment({ _commentId, _content, _is_delete }) {
    throw new Error('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
}

export default CommentRepository;
