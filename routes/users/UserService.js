const { sequelize, User } = require("../../database/models");

const { check, validationResult } = require("express-validator");
const GetUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();
    return res.json(users);
  } catch (error) {
    return next({ message: "Unable To find all users", status: 500 });
  }
};
const GetUserById = async (req, res, next) => {
  try {
    const uid = req.params.uid;
    validationResult(req).throw();
    // const user = await User.getByUid("fb17c695-9f6c-4373-a742-a108e6a2caf5");
    const user = await User.getByUid(uid);
    return res.json(user);
  } catch (error) {
    console.log(error.errors);
    return next({
      message: "Unable To  Create user",
      status: 500,
      error: error,
    });
  }
};
const CreateUser = async (req, res, next) => {
  try {
    const user = await User.create({
      name: "Sailaza2",
      email: "sailaza@acc.ltd",
      password: "1234",
      isActive: true,
    });
    return res.json(user);
  } catch (error) {
    return next({ message: "Unable To  Create user", status: 500 });
  }
};
const UpdateUserById = () => {};
const DeleteUserById = () => {};

module.exports = {
  GetUsers,
  GetUserById,
  CreateUser,
  UpdateUserById,
  DeleteUserById,
};
