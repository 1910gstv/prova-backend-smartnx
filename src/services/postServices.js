const database = require("../models");
const { v4: uuidv4 } = require("uuid");

const getAllPosts = async (user_id) => {
  try {
    const allPosts = await database.Post.findAll({
      include: [{ model: database.Comment, as: "comments",required: false }],
      order: ["create_time"],
    });

    if (allPosts.length == 0) {
      return { message: "No posts found!" };
    }

    return { allPosts };
  } catch (error) {
    return { error };
  }
};

const getPostById = async (post_id, user_id) => {
  try {
    const post = await database.Post.findOne({
      where: {
        id: post_id,
      },
      include: [{ model: database.Comment, as: "comments" }],
    });

    if (!post) {
      return { message: "Post not found." };
    }

    return { post };
  } catch (error) {
    return { error };
  }
};

const createPost = async (title, text, user_id) => {
  try {
    const createdPost = await database.Post.create({
      id: uuidv4(),
      title,
      text,
      user_id,
      create_time: new Date(),
    });

    return { createdPost };
  } catch (error) {
    return { error };
  }
};

const updatePost = async (post_id, user_id, data) => {
  try {
    if (data.id || data.user_id) {
      return { message: `Cant update id or user_id` };
    }
    const post = await database.Post.findOne({
      where: { id: post_id },
    });
    if (!post) {
      return { message: `Post ${post_id} not found.` };
    }

    if(post.user_id != user_id){
      return { message: `You can't edit posts from other users.`}
    }

    await post.update(data);

    return { post };
  } catch (error) {
    return { error };
  }
};

const deletePost = async (post_id, user_id) => {
  try {
    const post = await database.Post.findOne({
      where: { id: post_id },
    });
    if (!post) {
      return { message: `Post ${post_id} not found.` };
    }

    if(post.user_id != user_id){
      return { message: `You can't delete posts from other users.`}
    }

    await post.destroy();

    return true;
  } catch (error) {
    return { error };
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
