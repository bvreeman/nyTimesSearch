const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  headline: { type: String, required: true },
  snippet: { type: String, required: true },
  pub_date: { type: Date, required: true },
  web_url: { type: String, required: true }
});

const Articles = mongoose.model("Articles", ArticleSchema);

module.exports = Articles;