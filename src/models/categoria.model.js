import pool from "../config/db.js";

const categoriaModel = {
    insert: async (cCategoria) => {
        const sql = 'INSERT INTO categoria (idCategoria, descricaoCategoria, dataCadastro) VALUES (?,?,?);'
        const values = [cCategoria.idCategoria, cCategoria.descricaoCategoria, cCategoria.dataCadastro];
        const [rows] = await pool.execute(sql, values)
        return rows;
    },
    selectAll: async () => {
        const sql = "SELECT * FROM categoria;";
        const [rows] = await pool.execute(sql);
        return rows;
        
    }
}
export default categoriaModel