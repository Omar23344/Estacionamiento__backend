import express from "express";
import reporteController from "../controllers/reporte.controller.mjs";
const router = express.Router();

router.get("/", reporteController.getAll);
router.get("/export", reporteController.exportar);

export default router;
