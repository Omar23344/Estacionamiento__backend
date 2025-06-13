import express from "express";
import configuracionController from "../controllers/configuracion.controller.mjs";
const router = express.Router();

router.get("/tarifas", configuracionController.getTarifa);
router.put("/tarifas", configuracionController.updateTarifa);

export default router;
