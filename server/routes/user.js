const {
  updateUser,
  deleteUser,
  getUser,
  subscribe,
  unSubscribe,
  like,
  dislike,
} = require("../controllers/user");
const verifyToken = require("../middleware/verifyToken");

const router = require("express").Router();

router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);
router.get("/find/:id", getUser);
router.put("/sub/:id", verifyToken, subscribe);
router.put("/unsub/:id", verifyToken, unSubscribe);
router.put("/like/:videoId", verifyToken, like);
router.put("/dislike/:videoId", verifyToken, dislike);

module.exports = router;
