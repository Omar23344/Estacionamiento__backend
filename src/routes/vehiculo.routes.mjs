import express from "express";
import vehiculoController from "../controllers/vehiculo.controller.mjs";
const router = express.Router();

router.post("/", vehiculoController.create);
router.get("/historial", vehiculoController.historial);
router.patch("/salida/:id", vehiculoController.salida);

export default router;
