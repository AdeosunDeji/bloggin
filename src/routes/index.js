const { Router } = require("express");
// const { requiresAuth } = require("express-openid-connect");

const userRoutes = require("./userRoutes");
const postRoutes = require("./postRoutes");

const router = Router();

router.use("/users", userRoutes);
router.use("/posts", postRoutes);

module.exports = router;