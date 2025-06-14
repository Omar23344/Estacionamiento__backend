// archivo de configuacion de la base de datos
import pool from "../middlewares/db.mjs";

async function obtenerRegistros() {
    try {
        const result = await pool.query("SELECT * FROM cliente");
        return Promise.resolve(result.rows);
    } catch (error) {
        console.log("Error:", error);
        return Promise.reject("Ocurrió un error al intentar obtener los datos");
    }
}

async function crearRegistro(placa, dueno, lugar) {
    try {
        const result = await pool.query(
            "INSERT INTO cliente (placa, dueno, lugar) VALUES ($1, $2, $3) RETURNING id, placa, dueno, lugar",
            [placa, dueno, lugar]
        );
        return Promise.resolve(result.rows[0]);
    } catch (error) {
        console.log("Error:", error);
        return Promise.reject("Ocurrió un error al intentar agregar registros");
    }
}

async function editarRegistro(id, placa, dueno, lugar) {
    try {
        await pool.query(
            "UPDATE cliente SET placa = $1, dueno = $2, lugar = $3 WHERE id = $4",
            [placa, dueno, lugar, id]
        );
        return Promise.resolve("OK");
    } catch (error) {
        console.log("Error:", error);
        return Promise.reject("Ocurrió un error al intentar editar registros");
    }
}

async function eliminarRegistro(id) {
    try {
        await pool.query("DELETE FROM cliente WHERE id = $1", [id]);
        return Promise.resolve("OK");
    } catch (error) {
        console.log("Error:", error);
        return Promise.reject("Ocurrió un error al intentar eliminar registros");
    }
}

export default {
    obtenerRegistros,
    crearRegistro,
    editarRegistro,
    eliminarRegistro
}