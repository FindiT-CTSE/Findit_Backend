import { Router } from "express";
import { health } from "../controllers/healthController";
import authRoutes from "./authRoutes";

const router = Router();

router.get("/health", health);
router.use("/auth", authRoutes);

export default router;