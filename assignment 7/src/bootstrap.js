import express from "express";
import DBconnection from "./DB/connection.js";
import booksRouter from "./modules/books/books.controller.js";
import authorsRouter from "./modules/author/authors.controller.js";
import logsRouter from "./modules/logs/logs.controller.js";
async function bootstrap() {
  const app = express();

  await DBconnection();
  app.use(express.json());
  app.use("/collection/books", booksRouter);
  app.use("/collection/authors", authorsRouter);
  app.use("/collection/logs",logsRouter)

  app.listen(8000, () => {
    console.log("Server running on port 8000");
  });
}

export default bootstrap;
