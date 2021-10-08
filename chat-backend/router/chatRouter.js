// * path: api/messages
const { Router } = require("express");
const getChat = require("../controllers/chat.controller");
const validateJWT = require("../middleware/validateJWT");
const router = Router();

router.get("/:from", validateJWT, getChat);

module.exports = router;
