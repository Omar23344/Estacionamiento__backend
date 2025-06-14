import pool from "../middlewares/db.mjs";

const VehiculoService = {
    create: async (placa, marca, modelo, color, espacioId) => {
        // Registrar vehículo y ocupar espacio
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            const result = await client.query(
                `INSERT INTO vehiculos (placa, marca, modelo, color, espacio_id, entrada)
                 VALUES ($1, $2, $3, $4, $5, NOW())
                 RETURNING id, placa, marca, modelo, color, espacio_id, entrada`,
                [placa, marca, modelo, color, espacioId]
            );
            await client.query(
                `UPDATE espacios SET estado = 'Ocupado' WHERE id = $1`,
                [espacioId]
            );
            await client.query('COMMIT');
            return result.rows[0];
        } catch (err) {
            await client.query('ROLLBACK');
            throw err;
        } finally {
            client.release();
        }
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
        // Actualiza la hora de salida y libera el espacio
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            // Obtener espacio_id del vehículo
            const vehiculoRes = await client.query(
                `SELECT espacio_id, placa FROM vehiculos WHERE id = $1`,
                [id]
            );
            if (vehiculoRes.rowCount === 0) throw new Error("Vehículo no encontrado");
            const espacioId = vehiculoRes.rows[0].espacio_id;
            // Actualizar salida
            await client.query(
                `UPDATE vehiculos SET salida = NOW() WHERE id = $1`,
                [id]
            );
            // Liberar espacio
            await client.query(
                `UPDATE espacios SET estado = 'Disponible' WHERE id = $1`,
                [espacioId]
            );
            await client.query('COMMIT');
            return { mensaje: "Salida registrada y espacio liberado" };
        } catch (err) {
            await client.query('ROLLBACK');
            throw err;
        } finally {
            client.release();
        }
    }
};

export default VehiculoService;
