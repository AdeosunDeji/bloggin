const { Router } = require("express");
const UserController = require("../controllers/user");
const validator = require("../middlewares/validator");
const {  validateSignup, validateLogin, validateUpdate } = require("../validation/user");
const Authentication = require("../middlewares/auth");
const parser = require("../middlewares/upload");

const router = Router();


const { createUser, loginUser, uploadProfilePicture, getAllUsers, getUserById, updateUser, deleteUser } = UserController;
const { verifyToken } = Authentication;

router.post("/register", validator(validateSignup), createUser);
router.post("/login", validator(validateLogin), loginUser);

router.get("/", getAllUsers);
router.get("/:id", verifyToken, getUserById);

router.patch("/profile-picture", verifyToken, parser.single("image"), uploadProfilePicture);
router.patch("/update/:id", verifyToken, validator(validateUpdate), updateUser);

router.delete("/delete/:id", verifyToken, deleteUser);

module.exports = router;