// este controlador obtiene los datos que te envia el cliente 
// asi como los datos o las funciones para regresarle informacion
//librerias
import express from "express";
import connection from "../middlewares/db.mjs";
import ClienteService from "../services/cliente.service.mjs";

const router = express.Router();

// Obtener todos los registros
function obtenerRegistros(req, res, next) {
    ClienteService.obtenerRegistros()
        .then((registros) => res.json(registros))
        .catch((err) => {
            console.log(err);
            next(err);
        });
}

// Crear un nuevo registro
function crearRegistros(req, res, next) {
    const { placa, dueno, lugar } = req.body;

    ClienteService.crearRegistro(placa, dueno, lugar)
        .then(() => {
            res.status(201).json({ mensaje: "Cliente registrado correctamente." });
        })
        .catch(err => next(err));
}

// Editar un registro existente
function editarRegistros(req, res, next) {
    const { id, placa, dueno, lugar } = req.body;

    ClienteService.editarRegistro(id, placa, dueno, lugar)
        .then(() => {
            res.json({ mensaje: "Cliente actualizado correctamente." });
        })
        .catch(err => next(err));
}

// Eliminar un registro por ID
function eliminarRegistros(req, res, next) {
    const { id } = req.params;

    ClienteService.eliminarRegistro(id)
        .then(() => {
            res.json({ mensaje: "Cliente eliminado correctamente." });
        })
        .catch(err => next(err));
}

router.get("/", obtenerRegistros);
router.post("/", crearRegistros);
router.put("/", editarRegistros);
router.delete("/:id", eliminarRegistros);

export {
    obtenerRegistros,
    crearRegistros,
    editarRegistros,
    eliminarRegistros
};