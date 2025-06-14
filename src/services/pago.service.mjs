import pool from "../middlewares/db.mjs";

const PagoService = {
    getAll: async () => {
        const result = await pool.query(
            `SELECT id, placa, monto, fecha, metodo FROM pagos ORDER BY fecha DESC`
        );
        return result.rows;
    },
    create: async (placa, monto, metodo) => {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            // Buscar vehículo sin salida con esa placa
            const vehiculoRes = await client.query(
                `SELECT id, espacio_id, entrada FROM vehiculos WHERE placa = $1 AND salida IS NULL ORDER BY entrada DESC LIMIT 1`,
                [placa]
            );
            let montoCalculado = monto;
            if (vehiculoRes.rowCount > 0) {
                const { id: vehiculoId, espacio_id, entrada } = vehiculoRes.rows[0];
                // Obtener tarifa actual
                const tarifaRes = await client.query(
                    `SELECT tarifa FROM configuracion LIMIT 1`
                );
                const tarifa = tarifaRes.rows[0]?.tarifa || 0;
                // Calcular horas (redondear hacia arriba, mínimo 1)
                const entradaDate = new Date(entrada);
                const ahora = new Date();
                let horas = Math.ceil((ahora - entradaDate) / (1000 * 60 * 60));
                if (horas < 1) horas = 1;
                montoCalculado = tarifa * horas;
                // Marcar salida
                await client.query(
                    `UPDATE vehiculos SET salida = NOW() WHERE id = $1`,
                    [vehiculoId]
                );
                // Liberar espacio
                await client.query(
                    `UPDATE espacios SET estado = 'Disponible' WHERE id = $1`,
                    [espacio_id]
                );
            }
            // Registrar pago (siempre registra placa, monto calculado y método)
            const result = await client.query(
                `INSERT INTO pagos (placa, monto, fecha, metodo)
                 VALUES ($1, $2, NOW(), $3)
                 RETURNING id, placa, monto, fecha, metodo`,
                [placa, montoCalculado, metodo]
            );
            await client.query('COMMIT');
            return result.rows[0];
        } catch (err) {
            await client.query('ROLLBACK');
            throw err;
        } finally {
            client.release();
        }
    }
};

export default PagoService;
