const express = require("express");
const router = express.Router();
const collectionController = require("../../controllers/collectionController");
const {isPublicCheck} = require('../../middlewares/authValidate');
const multer = require("multer");
const { storage } = require("../../cloudinary");
const upload = multer({
  storage,
});

// Postioning of routes matter, let the specific routes come before general routes

// Special Route
router.get("/without-timelines", collectionController.getAll);

router.get("/:id",isPublicCheck,collectionController.get);
router.get("/", collectionController.getAllWithTimeline);
router.post("/", upload.single("image"), collectionController.create);
router.patch("/:id", upload.single("image"), collectionController.update);
router.delete("/:id", collectionController.deleteCollection);
router.post("/:id/upvote",collectionController.upvote);
router.post('/:id/downvote',collectionController.downvote);

module.exports = router;
