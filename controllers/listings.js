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
    const listing = await Listing.findById(req.params.id)
      .populate("seller")
      .populate({ path: "bids", populate: "bidder" });
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

// Creating a new Bid for a specific Listing
router.post("/:listingId/bids", async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.listingId);
    if (!listing) {
      res.status(404).json("This listing dosen't exist.");
    }
    listing.bids.push({ ...req.body, bidder: req.user._id });
    await listing.save();

    await listing.populate({
      path: "bids",
      populate: "bidder",
    });
    const bid = listing.bids.pop();
    res.status(201).json(bid);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
});

module.exports = router;
