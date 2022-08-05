const createError = require("../error/error");
const User = require("../models/User");
const Video = require("../models/Video");

const addVideo = async (req, res, next) => {
  const newVideo = new Video({ userId: req.user, ...req.body });
  try {
    const savedVideo = await newVideo.save();
    res.status(200).json(savedVideo);
  } catch (error) {
    next(error);
  }
};
const updateVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, "Video Not Found"));
    if (req.user === video.userId) {
      const updatedVideo = await Video.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );
      res.status(200).json(updateVideo);
    } else {
      return next(createError(403, "You can update only your video!"));
    }
  } catch (error) {
    next(error);
  }
};
const deleteVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, "Video not found!"));
    if (req.user === video.userId) {
      await Video.findByIdAndDelete(req.params.id);
      res.status(200).json("The video has been deleted!");
    } else {
      return next(createError(403, "You can delete only your video!"));
    }
  } catch (error) {
    next(error);
  }
};
const getVideo = async (req, res, next) => {
  const video = await Video.findById(req.params.id);
  if (!video) return next(createError(404, "Video not found!"));
  res.status(200).json(video);
};

const addView = async (req, res, next) => {
  try {
    await Video.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 },
    });
    res.status(200).json("The view has been increased!");
  } catch (error) {
    next(error);
  }
};
const random = async (req, res, next) => {
  try {
    const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
};
const trend = async (req, res, next) => {
  try {
    const videos = await Video.find().sort({ views: -1 });
    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
};
const sub = async (req, res, next) => {
  try {
    const user = await User.findById(req.user);
    const subscribedUsers = user.subscribedUsers;

    const listVideos = await Promise.all(
      subscribedUsers.map((channelId) => Video.find({ userId: channelId }))
    );

    res
      .status(200)
      .json(listVideos.flat().sort((a, b) => b.createdAt - a.createdAt));
  } catch (error) {
    next(error);
  }
};

const tags = async (req, res, next) => {
  const tags = req.query.tags.split(",");
  try {
    const videos = await Video.find({ tags: { $in: tags } }).limit(20);
    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
};

const search = async (req, res, next) => {
  const query = req.query.q;
  try {
    const videos = await Video.find({
      title: { $regex: query, $options: "i" },
    }).limit(40);
    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addVideo,
  updateVideo,
  deleteVideo,
  getVideo,
  addView,
  trend,
  random,
  sub,
  tags,
  search,
};
