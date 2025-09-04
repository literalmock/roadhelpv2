// models/Mechanic.js
import mongoose from "mongoose";

const mechanicSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  specialization: [String], // e.g., ["tyres", "engine", "battery"]
  location: {
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: { type: [Number], required: true }, // [lng, lat]
  },
  rating: { type: Number, default: 0 },
  isAvailable: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

mechanicSchema.index({ location: "2dsphere" });

const Mechanic = mongoose.model("Mechanic", mechanicSchema);
export default Mechanic;
