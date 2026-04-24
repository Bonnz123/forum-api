export const up = (pgm) => {
  pgm.createTable('comment_likes', {
    owner: {
      type: 'VARCHAR(50)',
      notNull: true,
      references: '"users"',
      onDelete: 'CASCADE',
    },
    comment_id: {
      type: 'VARCHAR(50)',
      notNull: true,
      references: '"comments"',
      onDelete: 'CASCADE',
    },
  });

  pgm.addConstraint(
    'comment_likes',
    'pk_comment_likes',
    'PRIMARY KEY(owner, comment_id)',
  );
};

export const down = (pgm) => {
  pgm.dropTable('comment_likes');
};
