import express from "express";
import Mechanic from "../models/mechanic.model.js";

export const getNearbyMechanics = async (req, res) => {
  const { lat, lng } = req.query;

  if (!lat || !lng) {
    return res.status(400).json({ message: "Latitude and longitude required" });
  }

  try {
    const mechanics = await Mechanic.find({
      isAvailable: true,
      location: {
        $near: {
          $geometry: { type: "Point", coordinates: [parseFloat(lng), parseFloat(lat)] },
          $maxDistance: 50000, // meters (5 km)
        },
      },
    }).limit(10);

    res.json({ mechanics });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching mechanics" });
  }
}
