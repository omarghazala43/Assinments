import { Router } from "express";
import { db } from "../../DB/connection.js";

const logsRouter = Router();

logsRouter.post("/capped", async (req, res) => {
  try {
    db.createCollection("logs", {
      capped: true,
      size: 1024 * 1024,
    });

    res.status(201).json({ ok: 1 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

logsRouter.post("/insert", async (req, res) => {
  try {
    const result = await db.collection("logs").insertOne(req.body)
    res.status(201).json({result})


  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


logsRouter.get("/aggregate4", async (req, res) => {
  try {
    const result = await db
      .collection("logs")
      .aggregate([
        {
          $lookup: {
            from: "books",
            localField: "book_id",
            foreignField: "_id",
            as: "book_details",
          },
        },
        {
          $project: {
            _id: 0,
            action: 1,
            book_details: { title: 1, author: 1, year: 1 },
          },
        },
      ])
      .toArray();
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
export default logsRouter;
