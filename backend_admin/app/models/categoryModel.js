const mongoose = require("mongoose");
const CategorySchema = new mongoose.Schema({
  categories: {
    type: String,
    require: true,
  },
});
module.exports = mongoose.model("Category", CategorySchema);
