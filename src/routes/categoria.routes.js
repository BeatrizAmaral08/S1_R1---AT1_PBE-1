import { Router } from "express";
import categoriaController from "../controllers/controller.js";
const categoriaRoutes = Router();

categoriaRoutes.post('/categorias', produtoController.criarCategoria);
categoriaRoutes.get('/categorias', produtoController.listarCategoria);

export default categoriaRoutes;