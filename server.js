// Requiring necessary npm packages
const express = require("express");
const path = require("path");
require("dotenv").config();

// Loggers for debugging
const colors = require("colors");
const logger = require("morgan");

// Object Data Modeling utility for Mongo/Node
const mongoose = require("mongoose");

// Sample Products
// const products = require("./data/products")
const productRoutes = require("./routes/productRoutes.js");
// const products = require("./data/products.js");

const PORT = process.env.PORT || 3001;
const app = express();

// Concise output colored by response status for development use. The :status token will be colored green for success codes, red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for information codes.
app.use(logger("dev"));

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/t2t", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
});

const connection = mongoose.connection;

connection.on("connected", () => {
    console.log("Mongoose connected successfully.".cyan.bold);
});

connection.on("error", (err) => {
    console.log(`Mongoose connection error: ${error.message}`.red.bold);
});

// Send every request to the React app
// Define any API routes before this runs
// app.get("*", function (req, res) {
//   res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });

// Testing GET request for Products in json
// app.get('/api/products', (req, res) => {
//   res.json(products)
// })

// app.get('/api/products:id', (req, res) => {
//   const product = products.find((p) => p._id === req.params.id)
//   res.json(product)
// })

app.use('/api/products', productRoutes)

app.listen(PORT, function () {
  console.log(`🌎 ==> API server now on port ${PORT}!`.yellow.bold);
});
