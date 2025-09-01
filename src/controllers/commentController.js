const { createComment, updateComment } = require("../services/commentServices");

exports.create = async (req, res) => {
  const { text, post_id } = req.body;
  const user_id = req.user.user_id;
  try {
    const { createdComment } = await createComment(text, user_id, post_id);

    return res.status(201).json(createdComment);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const text = req.body;
  const user_id = req.user.user_id;
  try {
    const { comment, message } = await updateComment(text, user_id, id);

    if (message) {
      return res.status(400).json(message);
    }

    return res
      .status(200)
      .json({ message: "Comment updated successfully.", comment });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
