const produtoModel = require("../models/produtoModel");

const produtoController = {

    /**
     * @async
     * @function criarProduto
     * @description Cadastra um novo produto no sistema após validar todos os campos obrigatórios
     */

    criarProduto: async (req, res) => {
        try {
            const { idProduto, idCategoria, nomeProduto, valorProduto, vinculoImagem, dataCadastro } = req.body;

            // Validação dos campos obrigatórios
            if (!idProduto || !idCategoria || !nomeProduto || !valorProduto || !vinculoImagem || !dataCadastro) {
                return res.status(400).json({ erro: "Campos obrigatórios não foram preenchidos" });
            }

            // Verifica se o ID já existe
            const idProdutoExiste = await produtoModel.buscarId(idProduto);

            if (idProdutoExiste && idProdutoExiste.length > 0) {
                return res.status(400).json({ erro: "ID do produto já cadastrado no sistema!" });
            }

            const result = await produtoModel.inserirProduto(
                idProduto,
                idCategoria,
                nomeProduto,
                valorProduto,
                vinculoImagem,
                dataCadastro
            );

            return res.status(201).json({
                mensagem: "Produto cadastrado com sucesso!",
                idProduto: result.idProduto
            });

        } catch (error) {
            console.error("Erro ao criar produto:", error);
            return res.status(500).json({ erro: "Erro interno ao cadastrar produto" });
        }
    },

    /**
     * @async
     * @function listarProdutos
     * @description Lista todos os produtos ou apenas um produto específico quando fornecido um ID
     */

    listarProdutos: async (req, res) => {
        try {
            const { idProduto } = req.query;

            if (idProduto) {
                const produto = await produtoModel.buscarUm(idProduto);

                if (!produto || produto.length === 0) {
                    return res.status(404).json({ erro: "Produto não encontrado" });
                }

                return res.status(200).json(produto[0]);
            }

            const produtos = await produtoModel.listarTodos();

            return res.status(200).json(produtos);

        } catch (error) {
            console.error("Erro ao listar produtos:", error);
            return res.status(500).json({ erro: "Erro interno ao listar produtos" });
        }
    },

    /**
     * @async
     * @function atualizarProduto
     * @description Atualiza os dados de um produto existente
     */

    atualizarProduto: async (req, res) => {
        try {
            const { idProduto } = req.params;
            const { idCategoria, nomeProduto, valorProduto, vinculoImagem, dataCadastro } = req.body;

            if (!idProduto) {
                return res.status(400).json({ erro: "ID do produto é obrigatório" });
            }

            const produto = await produtoModel.buscarUm(idProduto);

            if (!produto || produto.length !== 1) {
                return res.status(404).json({ erro: "Produto não encontrado" });
            }

            const atual = produto[0];

            // Mantém valores antigos se não forem enviados
            const categoriaNova = idCategoria ?? atual.idCategoria;
            const nomeNovo = nomeProduto ?? atual.nomeProduto;
            const valorNovo = valorProduto ?? atual.valorProduto;
            const imagemNova = vinculoImagem ?? atual.vinculoImagem;
            const dataNova = dataCadastro ?? atual.dataCadastro;

            await produtoModel.atualizarProduto(
                idProduto,
                categoriaNova,
                nomeNovo,
                valorNovo,
                imagemNova,
                dataNova
            );

            return res.status(200).json({
                mensagem: "Produto atualizado com sucesso!"
            });

        } catch (error) {
            console.error("Erro ao atualizar produto:", error);
            return res.status(500).json({ erro: "Erro interno ao atualizar produto" });
        }
    },

    /**
     * @async
     * @function deletarProduto
     * @description Remove um produto do sistema com base no ID fornecido
     */

    deletarProduto: async (req, res) => {
        try {
            const { idProduto } = req.params;

            if (!idProduto) {
                return res.status(400).json({ erro: "ID do produto é obrigatório" });
            }

            const produto = await produtoModel.buscarUm(idProduto);

            if (!produto || produto.length !== 1) {
                return res.status(404).json({ erro: "Produto não encontrado!" });
            }

            await produtoModel.deletarProduto(idProduto);

            return res.status(200).json({
                mensagem: "Produto deletado com sucesso!"
            });

        } catch (error) {
            console.error("Erro ao deletar produto:", error);
            return res.status(500).json({ erro: "Erro interno ao deletar produto" });
        }
    }
};

    module.exports = { produtoController };