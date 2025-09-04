// routes/mechanicRoutes.js
import express from "express";
import Mechanic from "../models/mechanic.model.js";
import { getNearbyMechanics } from "../controllers/mechanic.controllers.js";
const router = express.Router();

// GET /api/mechanics/nearby?lat=28.61&lng=77.20
router.get("/nearby", getNearbyMechanics);



export default router;
