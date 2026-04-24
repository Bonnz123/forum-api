class ReplyRepository {
  async addReply({ _userId, _threadIdid, _commentId, _content }) {
    throw new Error('REPLY_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async verifyReplyAccess({ _userId, _commentId, _replyId }) {
    throw new Error('REPLY_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async softDeleteReply({ _replyId, _content, _is_delete }) {
    throw new Error('REPLY_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
}

export default ReplyRepository;
