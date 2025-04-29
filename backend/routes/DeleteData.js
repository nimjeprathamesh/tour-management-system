import express from "express";
import { 
    DeleteContactInfo, DeleteDestination, DeleteMembership, DeletePackage, DeleteSubscription, DeleteTestimonial
} from "../controller/DeleteDataControler.js";

const DeleteDataRoutes = express.Router();

DeleteDataRoutes.delete("/api/destination", DeleteDestination);
DeleteDataRoutes.delete("/api/packages", DeletePackage);
DeleteDataRoutes.delete("/api/testimonial", DeleteTestimonial);
DeleteDataRoutes.delete("/api/membership", DeleteMembership);
DeleteDataRoutes.delete("/api/contactinfo/:id", DeleteContactInfo);
DeleteDataRoutes.delete("/api/subscription/:id", DeleteSubscription);

export default DeleteDataRoutes;