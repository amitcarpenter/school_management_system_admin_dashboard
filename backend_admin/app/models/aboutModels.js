const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  section: {
    type: String,
    default: "",
  },
  heading: {
    type: String,
    default: "",
  },
  subheading: {
    type: String,
    default: "",
  },
  massage: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    default: "",
  },
  bgImage: {
    type: String,
    default: "",
  },
  buttonText: {
    type: String,
    default: "",
  },
});

const About = mongoose.model("About", dataSchema);

module.exports = About;
