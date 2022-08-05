const {
  addComment,
  getComments,
  deleteComment,
} = require("../controllers/comment");
const verifyToken = require("../middleware/verifyToken");

const router = require("express").Router();

router.post("/", verifyToken, addComment);
router.delete("/:id", verifyToken, deleteComment);
router.get("/:videoId", getComments);

module.exports = router;
