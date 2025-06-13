import pool from "../middlewares/db.mjs";

const EspacioService = {
    getAll: async () => {
        const result = await pool.query("SELECT id, numero, estado FROM espacios");
        return result.rows;
    },
    create: async (numero, estado) => {
        const result = await pool.query(
            "INSERT INTO espacios (numero, estado) VALUES ($1, $2) RETURNING id, numero, estado",
            [numero, estado]
        );
        return result.rows[0];
    },
    update: async (id, numero, estado) => {
        await pool.query(
            "UPDATE espacios SET numero = $1, estado = $2 WHERE id = $3",
            [numero, estado, id]
        );
    },
    patchEstado: async (id, estado) => {
        await pool.query(
            "UPDATE espacios SET estado = $1 WHERE id = $2",
            [estado, id]
        );
    },
    remove: async (id) => {
        await pool.query("DELETE FROM espacios WHERE id = $1", [id]);
    }
};

export default EspacioService;
