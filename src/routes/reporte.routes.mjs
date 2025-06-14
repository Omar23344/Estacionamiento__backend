import express from "express";
import reporteController from "../controllers/reporte.controller.mjs";
const router = express.Router();

router.get("/", reporteController.getAll);
router.get("/export", reporteController.exportar);
router.get("/semana", reporteController.getBySemana);
router.get("/pagos", reporteController.pagosPorDia);

export default router;
