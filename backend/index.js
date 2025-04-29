import bcrypt from "bcryptjs";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import jwt from "jsonwebtoken";
import serveStatic from "serve-static";
import db from "./db/db.js";
import AdminAuthRoutes from "./routes/AdminAuth.js";
import AddDataRoutes from "./routes/AddData.js";
import DeleteDataRoutes from "./routes/DeleteData.js";
import GetDataRoutes from "./routes/GetData.js";
import UpdateDataGetRoutes from "./routes/UpdateData.js";

const STATIC_PATH =
    process.env.NODE_ENV === "production"
        ? `${process.cwd()}/frontend/dist`
        : `${process.cwd()}/frontend/`;

dotenv.config();
const app = express();
const PORT = parseInt(process.env.BACKEND_PORT || process.env.PORT || "3000", 10);

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
}));

db.connect((err) => {
    if (err) {
        console.error("Error connecting to MySQL:", err);
        return;
    }
    console.log("Connected to MySQL database");
});

app.get("/", (req, res) => {
    res.send("Hello Tour Management System!");
});

app.use("/api/auth", AdminAuthRoutes);
app.use("/api", AddDataRoutes);
app.use("/api", DeleteDataRoutes);
app.use("/api", GetDataRoutes);
app.use("/api", UpdateDataGetRoutes);

app.use(serveStatic(STATIC_PATH, { index: false }));

app.listen(PORT, () => {
    console.log(`Native app listening on port ${PORT}`);
});