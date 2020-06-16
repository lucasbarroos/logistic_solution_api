const mongoose = require('mongoose');

const { Schema } = mongoose;

const channelSchema = new Schema({
  name: String,
  description: String,
  banner: String,
  wallpaper: String,
});

module.exports = mongoose.model('channels', channelSchema);
