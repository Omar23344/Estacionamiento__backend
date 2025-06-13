import express from "express";
import {
    obtenerRegistros,
    crearRegistros,
    editarRegistros,
    eliminarRegistros,
} from "../controllers/cliente.controller.mjs";
import connection from "../middlewares/db.mjs";

const router = express.Router();

// Define las rutas para las operaciones CRUD
router.get("/cliente", obtenerRegistros); // Obtener todos los registros
router.post("/cliente", crearRegistros); // Crear un nuevo registro
router.put("/cliente", editarRegistros); // Editar un registro existente
router.delete("/cliente/:id", eliminarRegistros); // Eliminar un registro por ID

router.post("/usuario/login", async (req, res) => {
    const { usuario, contrasenia } = req.body;

    // Validación básica
    if (!usuario || !contrasenia) {
        return res.status(400).json({ success: false, mensaje: "Usuario y contraseña son requeridos" });
    }

    try {
        const [rows] = await connection.execute(
            "SELECT * FROM cliente2 WHERE usuario = ? AND contrasenia = ?",
            [usuario, contrasenia]
        );
        if (rows.length > 0) {
            res.json({ success: true, usuario: rows[0] });
        } else {
            res.status(401).json({ success: false, mensaje: "Usuario o contraseña incorrectos" });
        }
    } catch (error) {
        console.error("Error en /usuario/login:", error);
        res.status(500).json({ success: false, mensaje: "Error en el servidor" });
    }
});

export default router;