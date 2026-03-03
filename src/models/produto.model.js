import pool from "../config/db.js";

const produtoModel = {
    insert: async (pProduto) => {
        const sql = 'INSERT INTO produtos ( idProduto, idCategoria, nomeProduto, valorProduto, vínculoImagem, dataCadastro) VALUES (?,?,?,?,?,?);'
        const values = [pProduto.idProduto, pProduto.nomeProduto, pProduto.valorProduto, pProduto.idCategoria, pProduto.vinculoImagem, pProduto.dataCadastro];
        const [rows] = await pool.execute(sql, values)
        return rows;
    },
    selectAll: async () => {
        const sql = "SELECT * FROM produtos;";
        const [rows] = await pool.execute(sql);
        return rows;
        
    }
}
export default produtoModel