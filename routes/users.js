const express = require("express");
const router = express.Router();
const passport = require("passport");

const usersController = require("../controllers/users_controller");

router.get("/profile/:id", passport.checkAuthentication, usersController.profile);
router.post("/update/:id", passport.checkAuthentication, usersController.update);


router.get("/user-signup", usersController.signUp);
router.get("/user-signin", usersController.signIn);

router.post("/create", usersController.create);

router.get("/sign-out", usersController.destroySession);


// use passport as a middleware to authenticate
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/users/user-signin" }),
  usersController.createSession
);

module.exports = router;
