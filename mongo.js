require('dotenv').config();

const mongoose = require('mongoose');

const url = process.env.MONGODB_URL;

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log('connected to the database'))
  .catch((error) => { console.log(error); });
