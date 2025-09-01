const {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} = require("../services/postServices");

exports.getAll = async (req, res) => {
  try {
    const user_id = req.user.user_id;

    const { allPosts, error, message } = await getAllPosts(user_id);
    if (error) {
      throw new Error(error);
    }

    if (message) {
      return res.status(200).json(message);
    }

    return res.status(200).json(allPosts);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.getById = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user.user_id;
  try {
    const { post, message, error } = await getPostById(id, user_id);

    if (error) {
      throw new Error(error);
    }
    if (message) {
      return res.status(400).json(message);
    }

    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.create = async (req, res) => {
  const { title, text } = req.body;
  const user_id = req.user.user_id;
  try {
    const { createdPost } = await createPost(title, text, user_id);
    return res.status(201).json(createdPost);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  const {id} = req.params;
  const user_id = req.user.user_id;
  const data = req.body;
  try {
    const { post, message, error } = await updatePost(id, user_id, data);
    if (message) {
      return res.status(400).json(message);
    }
    if (error) {
      throw new Error(error);
    }
    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  const {id} = req.params;
  const user_id = req.user.user_id;
  try {
    const { message } = await deletePost(id, user_id);
    if (message) {
      return res.status(400).json(message);
    }

    return res.status(200).json({ message: `Post ${id} deleted` });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
