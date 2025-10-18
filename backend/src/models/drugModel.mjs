import pool from "../config/db.mjs"

export const getAllDrugs = async () => {
    try {
        const sql = "SELECT * FROM drugs ORDER BY launch_date DESC";
        const drugs = await pool.query(sql);
        return drugs?.[0] ?? [];
    } catch (ex) {
        throw ex;
    }
};
