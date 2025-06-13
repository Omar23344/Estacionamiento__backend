import pool from "../middlewares/db.mjs";

const ReservacionService = {
    getAll: async () => {
        const result = await pool.query(
            `SELECT id, placa, fecha, hora, espacio_id FROM reservaciones ORDER BY fecha DESC, hora DESC`
        );
        return result.rows;
    },
    create: async (placa, fecha, hora, espacioId) => {
        const result = await pool.query(
            `INSERT INTO reservaciones (placa, fecha, hora, espacio_id)
             VALUES ($1, $2, $3, $4)
             RETURNING id, placa, fecha, hora, espacio_id`,
            [placa, fecha, hora, espacioId]
        );
        return result.rows[0];
    },
    remove: async (id) => {
        await pool.query(`DELETE FROM reservaciones WHERE id = $1`, [id]);
    }
};

export default ReservacionService;
