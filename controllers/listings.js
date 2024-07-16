const express = require("express");
const verifyToken = require("../middleware/verify-token.js");
const Listing = require("../models/listing.js");
const router = express.Router();

// Public Routes

router.use(verifyToken);
// Protected Routes
// Show all listings page
router.get("/", async (req, res) => {
  try {
    const listings = await Listing.find({})
      .populate("seller")
      .sort({ createAt: "desc" });
    res.json(listings);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
});

// Show a Listing page
router.get("/:id", async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id).populate("seller");
    res.json(listing);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
});

// Creating a new Listing
router.post("/", async (req, res) => {
  try {
    const listing = await Listing.create({ ...req.body, seller: req.user._id });
    res.status(201).json(await listing.populate("seller"));
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
});

// Update an existing listing
router.put("/:id", async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing.seller.equals(req.user._id)) {
      return res
        .status(403)
        .json("You are not permitted to modify this listing");
    }

    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate("seller");

    res.json(updatedListing);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
});

// Deleting a listing
router.delete("/:id", async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing.seller.equals(req.user._id)) {
      return res
        .status(403)
        .json("You are not permitted to delete this listing");
    }

    await listing.deleteOne();
    res.json(listing);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
});

module.exports = router;
