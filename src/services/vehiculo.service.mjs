import pool from "../middlewares/db.mjs";

const VehiculoService = {
    create: async (placa, marca, modelo, color, espacioId) => {
        const result = await pool.query(
            `INSERT INTO vehiculos (placa, marca, modelo, color, espacio_id, entrada)
             VALUES ($1, $2, $3, $4, $5, NOW())
             RETURNING id, placa, marca, modelo, color, espacio_id, entrada`,
            [placa, marca, modelo, color, espacioId]
        );
        return result.rows[0];
    },
    historial: async () => {
        const result = await pool.query(
            `SELECT id, placa, marca, modelo, color, entrada, salida, espacio_id
             FROM vehiculos
             ORDER BY entrada DESC`
        );
        return result.rows;
    },
    salida: async (id) => {
        // Actualiza la hora de salida y calcula el monto (simulado)
        const salidaResult = await pool.query(
            `UPDATE vehiculos SET salida = NOW() WHERE id = $1 RETURNING *`,
            [id]
        );
        // Aquí podrías calcular el monto según la tarifa y tiempo
        return { mensaje: "Salida registrada", vehiculo: salidaResult.rows[0] };
    }
};

export default VehiculoService;
