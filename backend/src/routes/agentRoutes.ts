import { RequestHandler, Router } from "express";
import { CreateAgent, DeleteAgent, ShowAgents, UpdateAgent } from "../controllers/agentController";
import multer from "multer";
import Authenticator from "../middlewares/Authenticator";
const agentRoutes: Router = Router();

const upload = multer();
agentRoutes.post(
  "/agents",
  // upload.single("profile"),
  Authenticator as RequestHandler,
  CreateAgent as RequestHandler
);
agentRoutes.delete(
  "/agents/:id",
  Authenticator as RequestHandler,
  DeleteAgent as RequestHandler
);
agentRoutes.get(
  "/agents",
  Authenticator as RequestHandler,
  ShowAgents as RequestHandler
);
agentRoutes.put(
  "/agents/:id",
  Authenticator as RequestHandler,
  UpdateAgent as RequestHandler
)
export default agentRoutes;
