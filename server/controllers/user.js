const User = require("../models/User");
const Video = require("../models/Video");

const createError = require("../error/error.js");

const updateUser = async (req, res, next) => {
  if (req.params.id === req.user) {
    try {
      const updateUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updateUser);
    } catch (error) {
      next(error);
    }
  } else {
    return next(createError(403, "You can update only your account!"));
  }
};
const deleteUser = async (req, res, next) => {
  if (req.params.id === req.user) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted.");
    } catch (error) {
      next(error);
    }
  } else {
    return next(createError(403, "You can delete only your account!"));
  }
};
const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
const subscribe = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user, {
      $addToSet: { subscribedUsers: req.params.id },
    });
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: 1 },
    });
    res.status(200).json("Subscription successfull.");
  } catch (error) {
    next(error);
  }
};
const unSubscribe = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user, {
      $pull: { subscribedUsers: req.params.id },
    });
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: -1 },
    });
    res.status(200).json("Unsubscription successfull.");
  } catch (error) {
    next(error);
  }
};
const like = async (req, res, next) => {
  const id = req.user;
  const videoId = req.params.videoId;
  try {
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { likes: id },
      $pull: { dislikes: id },
    });
    res.status(200).json("The video has been liked.");
  } catch (error) {
    next(error);
  }
};
const dislike = async (req, res, next) => {
  const id = req.user;
  const videoId = req.params.videoId;
  try {
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { dislikes: id },
      $pull: { likes: id },
    });
    res.status(200).json("The video has been disliked.");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  updateUser,
  deleteUser,
  getUser,
  subscribe,
  unSubscribe,
  like,
  dislike,
};
