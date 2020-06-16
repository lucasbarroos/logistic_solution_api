const mongoose = require('mongoose');

const { Schema } = mongoose;

const clientSchema = new Schema({
  name: { type: String, required: true },
  address: {
    street: String,
    number: String,
    neighborhood: String,
    city: String,
    state: String,
    country: String,
  },
  banner: String,
});

module.exports = mongoose.model('clients', clientSchema);
