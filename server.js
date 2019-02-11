const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;
const path = require("path");
const compression = require('compression');

// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(compression());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
}
// Add routes, both API and view
app.use('/', routes);

// If no API routes are hit, send the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build"));
});

mongoose.Promise = global.Promise;

// Connect to the Mongo DB
const dbUri = process.env.MONGODB_URI || "mongodb://localhost:27017/nytreact";

mongoose.connect(dbUri, {useNewUrlParser: true}).then(() => console.log('connected to DB!')).catch((err) => console.log(err));

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});