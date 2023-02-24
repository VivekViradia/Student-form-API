const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
mongoose.connect("mongodb://0.0.0.0:27017/students-api", {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connection is Successful");
  })
  .catch((e) => {
    console.log("Connection Failed", e);
  });
