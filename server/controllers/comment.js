const createError = require("../error/error");
const Comment = require("../models/Comment");
const Video = require("../models/Video");

const addComment = async (req, res, next) => {
  const newComment = new Comment({ ...req.body, userId: req.user });
  try {
    const savedComment = await newComment.save();
    res.status(200).json(savedComment);
  } catch (error) {
    next(error);
  }
};
const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    const video = await Video.findById(req.params.id);

    if (req.user === comment.userId || req.user === video.userId) {
      await Comment.findByIdAndDelete(req.params.id);
      res.status(200).json("Comment deleted successfull!");
    } else {
      next(createError(403, "You can delete only your comment!"));
    }
  } catch (error) {
    next(error);
  }
};
const getComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ videoId: req.params.videoId });
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};

module.exports = { addComment, deleteComment, getComments };
