import pool from "../middlewares/db.mjs";

const ConfiguracionService = {
    getTarifa: async () => {
        const result = await pool.query(`SELECT tarifa FROM configuracion LIMIT 1`);
        return result.rows[0] || { tarifa: null };
    },
    updateTarifa: async (tarifa) => {
        await pool.query(`UPDATE configuracion SET tarifa = $1`, [tarifa]);
    }
};

export default ConfiguracionService;
