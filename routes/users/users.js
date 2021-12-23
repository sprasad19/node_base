const express = require("express");
const router = express.Router();
const { sequelize, User } = require("../../database/models");
const { check, validationResult } = require("express-validator");
const UserService = require("./UserService");
/* GET users listing. */
router.post("/create", UserService.CreateUser);

router.get("/all", UserService.GetUsers);
router.get(
  "/byid/:uid",
  check("uid").isUUID(4).withMessage("Please Provide a valid uuid"),
  UserService.GetUserById
);

module.exports = router;
