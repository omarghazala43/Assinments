import { Router } from "express";
import { db } from "../../DB/connection.js";

const authorsRouter = Router();

authorsRouter.post("/", async (req, res) => {
  try {
    const result = await db.collection("authors").insertOne(req.body);

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default authorsRouter;
