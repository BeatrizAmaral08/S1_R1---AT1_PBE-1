const categoriaModel = require("../models/categoriaModel");

const categoriaController = {

    criarCategoria: async (req, res) => {
        try {
            const { idCategoria, descricaoCategoria, dataCadastro } = req.body;

            if (!idCategoria || !descricaoCategoria ||!dataCadastro) {
                return res.status(400).json({
                    erro: "Campos obrigatórios não foram preenchidos"
                });
            }

            const idCategoriaExiste = await categoriaModel.buscarId(idCategoria);

            if (idCategoriaExiste && idCategoriaExiste.length > 0) {
                return res.status(400).json({
                    erro: "ID da categoria já foi cadastrado no sistema!"
                });
            }

            const result = await categoriaModel.inserirCategoria(
                idCategoria,
                descricaoCategoria,
                dataCadastro
            );

            return res.status(201).json({
                mensagem: "Categoria cadastrada com sucesso!",
                idCategoria: result.idCategoria
            });

        } catch (error) {
            console.error("Erro ao criar categoria:", error);
            return res.status(500).json({
                erro: "Erro interno ao cadastrar categoria"
            });
        }
    },

    listarCategoria: async (req, res) => {
        try {
            const { idCategoria } = req.query;

            if (idCategoria) {
                const categoria = await categoriaModel.buscarUma(idCategoria);

                if (!categoria || categoria.length === 0) {
                    return res.status(404).json({
                        erro: "Categoria não encontrada"
                    });
                }

                return res.status(200).json(categoria[0]);
            }

            const categorias = await categoriaModel.listarTodas();
            return res.status(200).json(categorias);

        } catch (error) {
            console.error("Erro ao listar categorias:", error);
            return res.status(500).json({
                erro: "Erro interno ao listar categorias"
            });
        }
    }

};

atualizarCategoria: async (req, res) => {
    try {
        const { idCategoria } = req.params;
        const { descricaoCategoria, dataCadastro } = req.body;

        if (!idCategoria) {
            return res.status(400).json({ erro: "ID da categoria é obrigatório" });
        }

        const categoria = await categoriaModel.buscarUma(idCategoria);

        if (!categoria || categoria.length !== 1) {
            return res.status(404).json({ erro: "Categoria não encontrada" });
        }

        const atual = categoria[0];

        // Mantém valores antigos se não forem enviados
        const descricaoNova = descricaoCategoria ?? atual.descricaoCategoria;
        const dataNova = dataCadastro ?? atual.dataCadastro;

        await categoriaModel.atualizarCategoria(
            idCategoria,
            descricaoNova,
            dataNova
        );

        return res.status(200).json({
            mensagem: "Categoria atualizada com sucesso!"
        });

    } catch (error) {
        console.error("Erro ao atualizar categoria:", error);
        return res.status(500).json({ erro: "Erro interno ao atualizar categoria" });
    }
},


    deletarCategoria: async (req, res) => {
    try {
        const { idCategoria } = req.params;

        if (!idCategoria) {
            return res.status(400).json({ erro: "ID da categoria é obrigatório" });
        }

        const categoria = await categoriaModel.buscarUma(idCategoria);

        if (!categoria || categoria.length !== 1) {
            return res.status(404).json({ erro: "Categoria não encontrada!" });
        }

        await categoriaModel.deletarCategoria(idCategoria);

        return res.status(200).json({
            mensagem: "Categoria deletada com sucesso!"
        });

    } catch (error) {
        console.error("Erro ao deletar categoria:", error);
        return res.status(500).json({ erro: "Erro interno ao deletar categoria" });
    }
}



module.exports = { categoriaController };