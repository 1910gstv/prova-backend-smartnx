const database = require("../models");
const { v4: uuidv4 } = require("uuid");

const createComment = async (text, user_id, post_id) => {
  try {
    const createdComment = await database.Comment.create({
      id: uuidv4(),
      text,
      user_id,
      post_id,
      create_time: new Date(),
    });

    return { createdComment };
  } catch (error) {
    return { error };
  }
};

const updateComment = async (text, user_id, id) => {
  try {
    const comment = await database.Comment.findOne({ where: { id } });
    if (!comment) {
      return { message: `Comment ${post_id} not found.` };
    }

    if (comment.user_id != user_id) {
      return { message: `You can't edit comments from other users.` };
    }

    await comment.update(text);

    return { comment };
  } catch (error) {
    return { error };
  }
};

module.exports = { createComment, updateComment };
