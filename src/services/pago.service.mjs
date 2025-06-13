import pool from "../middlewares/db.mjs";

const PagoService = {
    getAll: async () => {
        const result = await pool.query(
            `SELECT id, placa, monto, fecha, metodo FROM pagos ORDER BY fecha DESC`
        );
        return result.rows;
    },
    create: async (placa, monto, metodo) => {
        const result = await pool.query(
            `INSERT INTO pagos (placa, monto, fecha, metodo)
             VALUES ($1, $2, NOW(), $3)
             RETURNING id, placa, monto, fecha, metodo`,
            [placa, monto, metodo]
        );
        return result.rows[0];
    }
};

export default PagoService;
