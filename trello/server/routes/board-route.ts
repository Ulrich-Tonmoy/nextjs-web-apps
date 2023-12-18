import { getBoard } from "../controllers/board-controller";
import express from "express";
const router = express.Router();

router.get("/", getBoard);

export default router;
