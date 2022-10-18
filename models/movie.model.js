const mongoose = require("mongoose")

const moviesSchema = new mongoose.Schema({
  title: String,
  genre: String,
  plot: String,
  cast: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Celebrities"
  }]
  
})

const Movie = mongoose.model("Movie", moviesSchema)

module.exports = Movie