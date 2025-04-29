import express from "express";
import {
    GetContactInfo, GetDestinations, GetMemberships, GetPackages, GetSubscription, GetTestimonials
} from "../controller/GetDataController.js";

const GetDataRoutes = express.Router();

GetDataRoutes.get("/destinations", GetDestinations);
GetDataRoutes.get("/packages", GetPackages);
GetDataRoutes.get("/testimonials", GetTestimonials);
GetDataRoutes.get("/memberships", GetMemberships);
GetDataRoutes.get("/contactinfo", GetContactInfo);
GetDataRoutes.get("/subscription", GetSubscription);

export default GetDataRoutes;