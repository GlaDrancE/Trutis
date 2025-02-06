import { RequestHandler, Router } from "express";
import { AdminLogin, AdminSignup } from "../controllers/adminController";
import { AgentLogin, CreateAgent } from "../controllers/agentController";
const authRoutes: Router = Router();

authRoutes.post("/admin/login", AdminLogin as RequestHandler);
authRoutes.post("/admin/signup", AdminSignup as RequestHandler);

authRoutes.post("/agent/login", AgentLogin as RequestHandler);
authRoutes.post("/agent/signup", CreateAgent as RequestHandler);


export default authRoutes;
