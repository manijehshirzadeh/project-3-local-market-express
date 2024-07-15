const mongoose = require("mongoose");

const bidSchema = new mongoose.Schema(
  {
    price: {
      type: Number,
      required: true,
    },
    bidder: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const listingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Tools",
        "Furniture",
        "Garden",
        "Cloth",
        "Books",
        "Appliances",
        "Toys",
        "Electronics",
      ],
    },
    price: {
      type: Number,
      required: true,
    },
    postcode: {
      type: Number,
      required: true,
    },
    condition: {
      type: String,
      required: true,
      enum: ["New", "Used - like new", "Used - good", "Used - fair"],
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    bids: [bidSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Listing, listingSchema");
