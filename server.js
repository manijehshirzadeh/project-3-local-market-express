const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const testJWTController = require("./controllers/test-jwt");
const usersController = require("./controllers/users");
const profilesController = require("./controllers/profiles");
const listingsController = require("./controllers/listings");

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});
app.use(cors());
app.use(express.json());

// Routes go here
app.use("/test-jwt", testJWTController);
app.use("/users", usersController);
app.use("/profiles", profilesController);
app.use("/listings", listingsController);

app.listen(3000, () => {
  console.log("The express app is ready!");
});
