//  Add your code here
const mongoose = require("mongoose");

const celebritiesSchema = new mongoose.Schema({
  name: String,
  occupation: String,
  catchPhrase: String,
});

const Celebrities = mongoose.model("Celebrities", celebritiesSchema);

module.exports = Celebrities;
