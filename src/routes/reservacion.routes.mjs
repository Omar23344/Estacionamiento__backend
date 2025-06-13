import express from "express";
import reservacionController from "../controllers/reservacion.controller.mjs";
const router = express.Router();

router.get("/", reservacionController.getAll);
router.post("/", reservacionController.create);
router.delete("/:id", reservacionController.remove);

export default router;
