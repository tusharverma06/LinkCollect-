import express from "express";
const router = express.Router();
import collectionController from "../../controllers/collectionController";
import { isPublicCheck, userExist, checkWhenSomeoneisFetchigCollection } from '../../middlewares/validateRequests';
import { collectionLimit } from '../../middlewares/limits';
import { storage } from "../../cloudinary";
import isUserPublic from "../../middlewares/isUserPublic";
import { isCollectionOwner, isCollectionPublic } from "../../middlewares/isCollectionOwner";
import multer from "multer";
const upload = multer({
  storage,
});

// Postioning of routes matter, let the specific routes come before general routes

// -------------------------------SPECIAL ROUTES------------------------//

// get all the collections without any links of logged in user
router.get("/without-timelines", collectionController.getAll);

// Special Route to get all collections that are public by username by ANYONE
router.get("/user/:username", isUserPublic, collectionController.getAllByUsername)

// Check for duplicate link
router.post("/:id/check-duplicate-link", collectionController.doesLinkExist)

// ---------------------------------------------------------------------- //

// CRUD ROUTES
// get collection from collection id
router.get("/:id",isCollectionPublic ,collectionController.get);

// get all collections with timeline of the user
router.get("/", collectionController.getAllWithTimeline);

//collection limit removing for testing
router.post("/" ,upload.single("image"), collectionController.create);
router.patch("/:id", isCollectionOwner, upload.single("image"), collectionController.update);
router.delete("/:id", isCollectionOwner, collectionController.deleteCollection);


// save collection routes

// get all saved collection of a user by userid
router.get("/:id/getsaved", collectionController.getSavedCollections); // userId
// save a collection by collection id
router.post("/:id/save", collectionController.saveCollection);
//unsave a collection by collection id
router.post("/:id/unsave", collectionController.unsaveCollection);




// UPVOTE ROUTES
router.post("/:id/upvote", collectionController.upvote);
router.post('/:id/downvote', collectionController.downvote);

// PRIVACY ROUTES
router.post('/togglePrivacy/:id', collectionController.togglePrivacy);


// GET VALID TAGS
router.get("/tags/all", collectionController.getTags); // userId

// Explore
router.get("/page/explore/", collectionController.getExplorePage);

export default router;