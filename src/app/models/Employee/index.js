const mongoose = require('mongoose');

const { Schema } = mongoose;

const employeesSchema = new Schema({
  name: { type: String, required: true },
  profession: { type: String, required: true },
  birthdate: Date,
  address: {
    street: String,
    number: String,
    neighborhood: String,
    city: String,
    state: String,
    country: String,
  },
});

module.exports = mongoose.model('employees', employeesSchema);
