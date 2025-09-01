const database = require("../models");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

const createUser = async (name, username, password) => {
  try {
    console.log("Buscando usuario...");
    const usernameExists = await User.findOne({ where: { username } });
    if (usernameExists) {
      throw new Error("This username already exists. Try another username.");
    }
    console.log("hasheado senha ...");

    const hash = await bcrypt.hash(password, 10);

    console.log("Criando usuario");
    const createdUser = await User.create({
      id: uuidv4(),
      name,
      password: hash,
      username,
    });

    return { createdUser };
  } catch (error) {
    return { error };
  }
};

const login = async (username, password) => {
  try {
    const user = await User.findOne({
      username,
    });

    if (!user) {
      throw new Error("User not found!");
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) {
      throw new Error("Invalid password!");
    }

    const token = jwt.sign(
      {
        username: user.username,
        name: user.name,
        user_id: user.id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return { token };
  } catch (error) {
    console.log(error);
    return { error };
  }
};

module.exports = { createUser, login };
