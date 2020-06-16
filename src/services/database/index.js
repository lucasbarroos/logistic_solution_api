const mongoose = require('mongoose');
require('dotenv').config();

const URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?ssl=true&authSource=admin&w=majority`;
const connectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

const connect = async () => {
  mongoose.connect(URL, connectionOptions, (err) => {
    if (err) console.log('Error to connect the database');
    console.log('Mongodb connected');
  });
};

module.exports = { connect };
