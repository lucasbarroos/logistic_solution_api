const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  email: { type: String, required: true },
  profession: String,
  picture: String,
  channels: [{
    type: Schema.ObjectId, ref: 'channels',
  }],
  recommendedVideos: [{
    type: Schema.ObjectId, ref: 'videos',
  }],
  password: { type: String, required: true },
});

// eslint-disable-next-line func-names
userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model('users', userSchema);
