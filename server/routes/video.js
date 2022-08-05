const {
  addVideo,
  updateVideo,
  getVideo,
  deleteVideo,
  random,
  addView,
  trend,
  sub,
  search,
  tags,
} = require("../controllers/video");
const verifyToken = require("../middleware/verifyToken");
const router = require("express").Router();

router.post("/", verifyToken, addVideo);
router.put("/:id", verifyToken, updateVideo);
router.delete("/:id", verifyToken, deleteVideo);
router.get("/find/:id", getVideo);
router.put("/view/:id", addView);
router.get("/trend", trend);
router.get("/random", random);
router.get("/sub", verifyToken, sub);
router.get("/tags", tags);
router.get("/search", search);

module.exports = router;
