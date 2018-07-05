const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  title: { type: String, required: true },
  snippet: { type: String, required: true },
  pub_date: { type: String, required: true },
  web_url: { type: String, required: true }
});

const Articles = mongoose.model("article", ArticleSchema);

module.exports = Articles;