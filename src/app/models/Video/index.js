const mongoose = require('mongoose');

const { Schema } = mongoose;

const videoSchema = new Schema({
  title: { type: String },
  date: { type: Date, default: new Date() },
  banner: String,
  video: String,
  description: String,
  duration: String,
  channel: { type: Schema.ObjectId, ref: 'channels' },
  video_analytics: {
    views: { type: Number, default: 0 },
    recommended: { type: Number, default: 0 },
  },
});

module.exports = mongoose.model('videos', videoSchema);
