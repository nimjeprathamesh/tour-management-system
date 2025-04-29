import express from "express";
import {
    AddDestination, AddFeedback, AddMembership, AddPackage, AddSubscription, AddTestimonial
} from "../controller/AddDataController.js";

const AddDataRoutes = express.Router();

AddDataRoutes.post("/api/subscription", AddSubscription);
AddDataRoutes.post("/api/feedback", AddFeedback);
AddDataRoutes.post("/api/destination", AddDestination);
AddDataRoutes.post("/api/package", AddPackage);
AddDataRoutes.post("/api/testimonial", AddTestimonial);
AddDataRoutes.post("/api/membership", AddMembership);

export default AddDataRoutes;