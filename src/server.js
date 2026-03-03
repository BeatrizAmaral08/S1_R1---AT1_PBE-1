import express from "express";
import produtoRoutes from "./routes/produto.routes.js";
import categoriaRoutes from "./routes/categoria.routes.js";
import 'dotenv/config';

const app = express();
app.use('/', produtoRoutes);
app.use('/', categoriaRoutes);

app.listen(process.env.SERVER_PORT, ()=> {
    console.group(`servidor rodando em http://localhost:${process.env.SERVER_PORT}`);
})

