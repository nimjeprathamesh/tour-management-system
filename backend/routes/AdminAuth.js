import express from "express";
import { AdminLogin, AdminRegister } from "../controller/AdminAuthController.js";

const AdminAuthRoutes = express.Router();

AdminAuthRoutes.post("/signup", AdminRegister);
AdminAuthRoutes.post("/signin", AdminLogin);

export default AdminAuthRoutes;