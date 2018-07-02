const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  title: { type: String, required: true },
  date: { type: Date, default: Date.now, required: true },
  url: String,
});

const Article = mongoose.model("Book", articleSchema);

module.exports = Article;
