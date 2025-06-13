import pool from "../middlewares/db.mjs";

const ReporteService = {
    getAll: async () => {
        const result = await pool.query(
            `SELECT fecha::date,
                    COUNT(CASE WHEN entrada IS NOT NULL THEN 1 END) AS entradas,
                    COUNT(CASE WHEN salida IS NOT NULL THEN 1 END) AS salidas
             FROM vehiculos
             GROUP BY fecha::date
             ORDER BY fecha::date DESC`
        );
        return result.rows;
    },
    exportar: async (fecha, formato) => {
        // Simulación de exportación, aquí deberías generar el archivo real
        return { archivo: `reporte_${fecha}.${formato}` };
    }
};

export default ReporteService;
