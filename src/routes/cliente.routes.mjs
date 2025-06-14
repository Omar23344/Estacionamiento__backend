import express from "express";
import {
    obtenerRegistros,
    crearRegistros,
    editarRegistros,
    eliminarRegistros,
} from "../controllers/cliente.controller.mjs";

const router = express.Router();

// Corrige las rutas para que sean consistentes con el resto de la API y el frontend
router.get("/", obtenerRegistros); // Obtener todos los registros
router.post("/", crearRegistros); // Crear un nuevo registro
router.put("/", editarRegistros); // Editar un registro existente
router.delete("/:id", eliminarRegistros); // Eliminar un registro por ID

// Elimina el endpoint de login aquí, ya que debe estar en /usuarios/login

export default router;