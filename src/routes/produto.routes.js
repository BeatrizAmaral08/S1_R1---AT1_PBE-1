import { Router } from "express";
import produtoController from "../controllers/controller.js";
const produtoRoutes = Router();

produtoRoutes.post('/produtos', produtoController.criarProduto);
produtoRoutes.get('/produtos', produtoController.listarProdutos);
produtoRoutes.put('/produtos', produtoController.tualizarProduto);
produtoRoutes.delete('/produtos', produtoController.deletarProduto);
produtoRoutes.post('/produtos', produtoController.criarCategoria);
produtoRoutes.get('/produtos', produtoController.listarCategoria);

export default produtoRoutes;