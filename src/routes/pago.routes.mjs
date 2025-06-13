import express from "express";
import pagoController from "../controllers/pago.controller.mjs";
const router = express.Router();

router.get("/", pagoController.getAll);
router.post("/", pagoController.create);

export default router;
