const { signup, signin, googleAuth } = require("../controllers/auth");

const router = require("express").Router();

router.post("/signup", signup);

router.post("/signin", signin);

router.post("/google", googleAuth);

module.exports = router;
