// * path: /api/login
const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");

const {
  createUser,
  login,
  renewToken,
} = require("../controllers/auth.controllers");

const { validateFields } = require("../middleware/fieldValidation");

router.post(
  "/new",
  [
    check("name", "Please provide a valid name").not().isEmpty(),
    check("email", "Please provide a valid email").isEmail().normalizeEmail(),
    check("password", "Please provide a valid password").not().isEmpty(),
    validateFields,
  ],
  createUser
);

router.post(
  "/",
  [
    check("email", "Please provide a valid email").isEmail().normalizeEmail(),
    check("password", "Please provide a valid password").not().isEmpty(),
    validateFields,
  ],

  //check express-validator docs for more options
  login
);

router.get("/renew", renewToken);

module.exports = router;
