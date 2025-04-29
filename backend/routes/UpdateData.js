import express from "express";
import {
    UpdateDestination, UpdateMembership, UpdatePackage, UpdateTestimonial 
} from "../controller/UpdateDataController.js";

const UpdateDataGetRoutes = express.Router();

UpdateDataGetRoutes.put("/api/destination", UpdateDestination);
UpdateDataGetRoutes.put("/api/package", UpdatePackage);
UpdateDataGetRoutes.put("/api/testimonial", UpdateTestimonial);
UpdateDataGetRoutes.put("/api/membership", UpdateMembership);

export default UpdateDataGetRoutes;