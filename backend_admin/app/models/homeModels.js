const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  section: {
    type: String,
    default: ''
  },
  heading: {
    type: String,
    default: ''
  },
  subheading: {
    type: String,
    default: ''
  },
  massage: {
    type: String,
    default: ''
  },

  image: {
    type: String,
    default: ''
  },
  bgImage: {
    type: String,
    default: ''
  },
  buttonText: {
    type: String,
    default: ''
  } ,
  content1Input1: String,
  content1Input2: String,
  content2Input1: String,
  content2Input2: String,
  content3Input1: String,
  content3Input2: String,
});

const Home = mongoose.model('Home', dataSchema);


module.exports = Home;
