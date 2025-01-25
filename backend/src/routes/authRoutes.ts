import { RequestHandler, Router } from "express";
import { AdminLogin, AdminSignup } from "../controllers/adminController";
const authRoutes: Router = Router();

authRoutes.post("/admin/login", AdminLogin as RequestHandler);
authRoutes.post("/admin/signup", AdminSignup as RequestHandler);

export default authRoutes;
