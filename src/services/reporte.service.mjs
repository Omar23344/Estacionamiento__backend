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
    // Reporte de entradas/salidas por semana (YYYY-MM-DD = lunes de la semana)
    getBySemana: async (fecha) => {
        // fecha debe ser el lunes de la semana (YYYY-MM-DD)
        const result = await pool.query(
            `SELECT 
                date_trunc('day', entrada)::date AS fecha,
                COUNT(*) FILTER (WHERE entrada IS NOT NULL) AS entradas,
                COUNT(*) FILTER (WHERE salida IS NOT NULL) AS salidas
            FROM vehiculos
            WHERE entrada >= $1::date
              AND entrada < ($1::date + interval '7 days')
            GROUP BY fecha
            ORDER BY fecha ASC`,
            [fecha]
        );
        return result.rows;
    },
    // Historial de pagos por día (YYYY-MM-DD)
    pagosPorDia: async (fecha) => {
        const result = await pool.query(
            `SELECT placa, monto, fecha::date, metodo
             FROM pagos
             WHERE fecha::date = $1::date
             ORDER BY fecha ASC`,
            [fecha]
        );
        return result.rows;
    },
    exportar: async (fecha, formato) => {
        // Simulación de exportación, aquí deberías generar el archivo real
        return { archivo: `reporte_${fecha}.${formato}` };
    }
};

export default ReporteService;
