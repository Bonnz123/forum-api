import CommentLikeRepository from '../CommentLikeRepository';

describe('CommentLikeRepository', () => {
  it('should throw error when invoke abstract function', async () => {
    // Arrange
    const commentLikeRepository = new CommentLikeRepository();

    // Action & Assert
    await expect(commentLikeRepository.addLike('', '')).rejects.toThrow(
      'COMMENT_LIKE_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );
    await expect(
      commentLikeRepository.isCommentLikedByUser('', ''),
    ).rejects.toThrow('COMMENT_LIKE_REPOSITORY.METHOD_NOT_IMPLEMENTED');

    await expect(commentLikeRepository.deleteLike('', '')).rejects.toThrow(
      'COMMENT_LIKE_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );
  });
});
