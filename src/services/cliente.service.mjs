// archivo de configuacion de la base de datos
import connection from "../middlewares/db.mjs";

async function obtenerRegistros() {
    try {
        // Consulta para obtener todos los registros
        const [rows] = await connection.execute("SELECT * FROM cliente");
        return Promise.resolve(rows);
    } catch (error) {
        console.log("Error:", error);
        return Promise.reject("Ocurrio un error al intentar obtener los datos");
    }
}

async function crearRegistro(placa, dueno, lugar) {
    try {
        // Ejecutamos la consulta SQL para insertar datos
        const [result] = await connection.execute(
            "INSERT INTO cliente (placa, dueno, lugar) VALUES (?, ?, ?)",
            [placa, dueno, lugar]
        );

        // Se devuelve el resultado de la operación
        console.log("Insertado: ", result);
        return Promise.resolve("OK");
    } catch (error) {
        // Se muestra el error y se retorna un mensaje de error
        console.log("Error:", error);
        return Promise.reject("Ocurrio un error al intentar agregar registros");
    }
}

async function editarRegistro(id, placa, dueno, lugar) {
    try {
        const [result] = await connection.execute(
            "UPDATE cliente SET placa = ?, dueno = ?, lugar = ? WHERE id = ?",
            [placa, dueno, lugar, id]
        );
        console.log("Editado: ", result);
        return Promise.resolve("OK");
    } catch (error) {
        console.log("Error:", error);
        return Promise.reject("Ocurrio un error al intentar editar registros");
    }
}

async function eliminarRegistro(id) {
    try {
        // Ejecutamos la consulta SQL para eliminar datos
        const [result] = await connection.execute("DELETE FROM cliente WHERE id = ?", [id]);

        // Se devuelve el resultado de la operación
        console.log("Eliminado: ", result);
        return Promise.resolve("OK");
    } catch (error) {
        // Se muestra el error y se retorna un mensaje de error
        console.log("Error:", error);
        return Promise.reject("Ocurrio un error al intentar eliminar registros");
    }
}

export default {
    obtenerRegistros,
    crearRegistro,
    editarRegistro,
    eliminarRegistro
}