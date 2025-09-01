const database = require("../models");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

const validatePassword = (password) => {
  if (!password || password == null) {
    return false;
  }

  const regex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/;

  return regex.test(password);
};
const createUser = async (name, username, password) => {
  try {
    console.log("Buscando usuario...");
    const usernameExists = await User.findOne({ where: { username } });
    if (usernameExists) {
      throw new Error("This username already exists. Try another username.");
    }

    const passwordIsValid = validatePassword(password);
    if (passwordIsValid == false) {
      throw new Error(
        "This password is invalid. The password must be a minimum of eight characters, including one uppercase letter, one lowercase letter, one number, and one special character."
      );
    }

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
