import express, { RequestHandler } from "express";
import cors from "cors";
import { json } from "body-parser";

import authRoutes from "./routes/authRoutes";
import agentRoutes from "./routes/agentRoutes";
import clientRoutes from "./routes/clientRoutes";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(json());
app.use(
  cors({
    origin: ["http://localhost:5174", "http://localhost:5173"],
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api", agentRoutes)
app.use("/api", clientRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});