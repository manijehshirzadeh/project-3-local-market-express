const express = require("express");
const verifyToken = require("../middleware/verify-token.js");
const Listing = require("../models/listing.js");
const router = express.Router();

// Public Routes

router.use(verifyToken);
// Protected Routes
// Creating a new Post
router.post("/", async (req, res) => {
  try {
    const listing = await Listing.create({ ...req.body, seller: req.user._id });
    res.status(201).json(await listing.populate("seller"));
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
});

module.exports = router;
