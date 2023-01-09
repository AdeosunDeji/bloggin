// const { Router } = require("express");
// const passport = require("passport");
// require("../utils/google");
// const { successResponse } = require("../utils/responses");

// const router = Router();

// router.get(
//   "/",
//   passport.authenticate("google", {
//     scope: ["email", "profile"]
//   })
// );

// router.get("/redirect", passport.authenticate("google", { failureRedirect: "/" }), (req, res) => {
//   return successResponse(res, 200, "User Logged in!", { userDetails: req.user, token: req.file });
// });

// module.exports = router;


// // router.get("/redirect", passport.authenticate("google", { failureRedirect: "/" }), (req, res) => {
// //     // handle user authentication
// //   });
  
// //   router.get("/", getAllUsers);