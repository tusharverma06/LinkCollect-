import express from "express";
import timelineController from "../../controllers/timelineController";
import { isCollectionOwner } from "../../middlewares/isCollectionOwner";
import { collectionLimit, LinkLimit } from "../../middlewares/limits";
import { checkDuplicateLink } from "../../middlewares/checkDuplicateLink";

const router = express.Router({ mergeParams: true });

// Positioning of routes matter, let the specific routes come before general routes

// CRUD Routes
router.post(
  "/",
  isCollectionOwner,
  LinkLimit,
  checkDuplicateLink,
  timelineController.create
);
router.patch(
  "/:timelineId",
  isCollectionOwner,
  timelineController.updateTimeline
);
router.delete(
  "/:timelineId",
  isCollectionOwner,
  timelineController.deleteTimeline
);

export default router;