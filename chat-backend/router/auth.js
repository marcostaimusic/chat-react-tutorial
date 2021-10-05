// * path: /api/login
const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");

const {
  createUser,
  login,
  renewToken,
} = require("../controllers/auth.controllers");

router.post("/new", createUser);

router.post(
  "/",
  [check("email", "Please provide a valid email").isEmail()],
  [check("password", "Please provide a valid password").not().isEmpty()], //check express-validator docs for more options
  login
);

router.get("/renew", renewToken);

module.exports = router;
