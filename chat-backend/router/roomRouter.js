// * path api/room
const { Router } = require("express");
// TODO serve creare il controller getRoom ?
const {
  createRoom,
  getRooms,
  getRoom,
  getUserName,
} = require("../controllers/room.controllers");
const validateJWT = require("../middleware/validateJWT");
const router = Router();

router.post("/", validateJWT, createRoom);
router.get("/:name", validateJWT, getRoom);
router.get("/", validateJWT, getRooms);
router.get("/users/:id", validateJWT, getUserName);

module.exports = router;
