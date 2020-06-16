const VideoModel = require('../../models/Video/index');
const UserModel = require('../../models/User/index');

const store = async (req, res) => {
  try {
    const video = await VideoModel.create(req.body);
    return res.send(video);
  } catch (err) {
    return res.sendStatus(400).send({ message: 'Error to save the video!' });
  }
};

const update = async (req, res) => {
  try {
    const video = await VideoModel
      .findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
    return res.send(video);
  } catch (err) {
    return res.sendStatus(400).send({ message: 'Error to update the video!' });
  }
};

const show = async (req, res) => {
  try {
    const video = await VideoModel.findById(req.params.id)
      .populate('channel');

    if (!video) {
      return res.sendStatus(404).send({ message: 'Video not found!' });
    }

    const subs = await UserModel
      .countDocuments({ channels: { $in: video.channel._id } });

    await VideoModel
      .findOneAndUpdate(
        { _id: req.params.id },
        {
          video_analytics:
          {
            views: video.video_analytics.views + 1,
            recommended: video.video_analytics.recommended,
          },
        },
        {
          new: true,
        },
      );

    return res.send({ video, subs });
  } catch (err) {
    return res.sendStatus(400).send({ message: 'Error to get the video!' });
  }
};

const index = async (req, res) => {
  try {
    const filter = {};
    if (req.query.channel) filter.channel = req.query.channel;
    const videos = await VideoModel.find(filter).populate('channel');
    return res.send(videos);
  } catch (err) {
    return res.sendStatus(400).send({ message: 'Error to show the videos!' });
  }
};

const destroy = async (req, res) => {
  try {
    const video = await VideoModel.findByIdAndDelete(req.params.id);
    return res.send(video);
  } catch (err) {
    return res.sendStatus(400).send({ message: 'Error to delete the video!' });
  }
};

const recommendVideo = async (req, res) => {
  try {
    const video = await VideoModel.findById(req.params.id);
    const user = await UserModel.findById(req.params.userId);

    if (!video) return res.sendStatus(400).send({ message: 'Video not found!' });

    if (!user) return res.sendStatus(400).find({ message: 'User not found' });

    const newVideo = await VideoModel
      .findOneAndUpdate(
        { _id: req.params.id },
        {
          video_analytics:
          {
            views: video.video_analytics.views,
            recommended: video.video_analytics.recommended + 1,
          },
        },
        {
          new: true,
        },
      ).populate('channel');

    await UserModel.findOneAndUpdate({ _id: req.params.userId },
      { $push: { recommendedVideos: video } }); // Inserting the channel in the user list

    return res.send(newVideo);
  } catch (err) {
    return res.sendStatus(400).send({ message: 'Error to recommend the video!' });
  }
};

const checkRecommendVideo = async (req, res) => {
  try {
    const user = await UserModel
      .findOne({ _id: req.params.userId, recommendedVideos: { $in: req.params.id } });

    if (!user) return res.sendStatus(400);

    return res.sendStatus(200);
  } catch (err) {
    return res.sendStatus(400).send({ message: 'Error to find the recommended the video!' });
  }
};

module.exports = {
  store,
  update,
  show,
  index,
  destroy,
  recommendVideo,
  checkRecommendVideo,
};
