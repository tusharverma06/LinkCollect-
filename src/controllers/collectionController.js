const CollectionService = require("../services/collectionService");
const collectionService = new CollectionService();

const create = async (req, res) => {
  try {
    // Adding image url we got from cloudinary to req.body
    //console.log(req.body,req.userId);
    if (req.file) {
      req.body.image = req.file.path;
    }
    // Change to req.userId
    const collection = await collectionService.create({ ...req.body, userId: req.userId });
    return res.status(201).json({
      data: collection,
      success: true,
      message: "Successfully created a Collection",
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "Not able to create Collections",
      err: error,
    });
  }
};

const togglePrivacy = async (req, res) => {
  try {
    const collection = await collectionService.togglePrivacy(req.params.id);
    let isPublic;
    isPublic = collection.isPublic ? "Public" : "Private";
    return res.status(201).json({
      success: true,
      message: `Successfully made your collection ${isPublic}`,
      data: collection,
      err: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      message: error.message,
      data: {},
      success: false,
      err: error.explanation,
    });
  }
}
const deleteCollection = async (req, res) => {
  try {
    const collection = await collectionService.delete(req.params.id);
    return res.status(201).json({
      data: collection,
      success: true,
      message: `Successfully deleted the Collection `,
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "Not able to delete Collections",
      err: error,
    });
  }
};
const update = async (req, res) => {
  try {
    // Adding image url we got from cloudinary to req.body
    if (req.file) {
      req.body.image = req.file.path;
    }
    const collection = await collectionService.update(req.params.id, req.body);
    return res.status(201).json({
      data: collection,
      success: true,
      message: "Successfully Updated a Collection",
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "Not able to update Collections",
      err: error,
    });
  }
};

const get = async (req, res) => {
  try {
    const collection = await collectionService.get(req.params.id);
    return res.status(201).json({
      data: collection,
      success: true,
      message: "Successfully fetched a Collection",
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "Not able to fetch the Collection",
      err: error,
    });
  }
};
const getAll = async (req, res) => {
  try {
    console.log("hello");
    const collection = await collectionService.getAll(req.userId);
    return res.status(201).json({
      data: collection,
      success: true,
      message: "Successfully fetched a Collection",
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "Not able to fetch the Collection",
      err: error,
    });
  }
};
const getAllWithTimeline = async (req, res) => {
  try {
    const collection = await collectionService.getAllWithTimeline(req.userId);
    return res.status(201).json({
      data: collection,
      success: true,
      message: "Successfully fetched a Collection",
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "Not able to fetch the Collection",
      err: error,
    });
  }
};

const getAllByUsername = async (req, res) => {
  try {
    const { username } = req.params;
    const collection = await collectionService.getAllByUsername(username, req.ownsUsername);
    return res.status(201).json({
      data: collection,
      success: true,
      message: "Successfully fetched a Collection",
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "Not able to fetch the Collection",
      err: error,
    });
  }
};

// change to req.userId
const upvote = async (req, res) => {
  try {
    const collection = await collectionService.upvote(req.params.id, req.userId);
    return res.status(201).json({
      data: collection,
      success: true,
      message: "Successfully upvoted a Collection",
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "Not able to upvote the Collection",
      err: error,
    });
  }
};
// Change to req.userId
const downvote = async (req, res) => {
  try {
    const collection = await collectionService.downvote(
      req.params.id,
      req.userId
    );
    return res.status(201).json({
      data: collection,
      success: true,
      message: "Successfully downvoted a Collection",
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "Not able to downvote the Collection",
      err: error,
    });
  }
};

module.exports = {
  create,
  deleteCollection,
  update,
  getAll,
  get,
  getAllWithTimeline,
  upvote,
  downvote,
  togglePrivacy,
  getAllByUsername
};
