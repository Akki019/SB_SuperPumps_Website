
require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const user = require("./routes/User");

const app = express();
app.use(express.json());
const cors = require('cors');

app.use(cors());


app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

app.use("/api/User", user);

// connect to db
mongoose.connect(process.env.MONGO_URI , {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});


    // listen to port
const port = process.env.PORT || 5000; // Choose the desired port for your server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

