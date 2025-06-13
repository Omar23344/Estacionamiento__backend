import express from "express";
import espacioController from "../controllers/espacio.controller.mjs";
const router = express.Router();

router.get("/", espacioController.getAll);
router.post("/", espacioController.create);
router.put("/:id", espacioController.update);
router.patch("/:id", espacioController.patchEstado);
router.delete("/:id", espacioController.remove);

export default router;
