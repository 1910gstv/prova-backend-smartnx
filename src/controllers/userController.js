const { createUser, login } = require("../services/userServices");

exports.create = async (req, res) => {
  const { name, username, password } = req.body;
  try {
    const { createdUser, error } = await createUser(name, username, password);
    if (error) {
      throw new Error(error);
    }

    return res.status(201).send(createdUser);
  } catch (error) {
    console.log(error)
    return res.status(500).json({error: error.message});
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const { token, error } = await login(username, password);
    if (error) {
      throw new Error(error);
    }

    return res.json({ message: "Autenticated user success", token });
  } catch (error) {
    return res.status(500).send(error);
  }
};
