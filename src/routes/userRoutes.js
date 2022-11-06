const { Router } = require("express");
const UserController = require("../controllers/user");
const validator = require("../middlewares/validator");
const {  validateSignup, validateLogin } = require("../validation/user");

const router = Router();


const { createUser, loginUser } = UserController;

router.post("/register", validator(validateSignup), createUser);
router.post("/login", validator(validateLogin), loginUser);

module.exports = router;