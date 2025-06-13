import express from "express";
import usuarioController from "../controllers/usuario.controller.mjs";
const router = express.Router();

router.post("/login", usuarioController.login);
router.get("/", usuarioController.getAll);
router.post("/", usuarioController.create);
router.put("/:id", usuarioController.update);
router.delete("/:id", usuarioController.remove);

export default router;
