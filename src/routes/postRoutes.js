const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const auth = require("../middleware/auth");

router.get("/all", auth, postController.getAll);
router.get("/get/:id", auth, postController.getById);
router.post("/create", auth, postController.create);
router.put("/update/:id", auth, postController.update);
router.delete("/delete/:id", auth, postController.delete);

module.exports = router;
