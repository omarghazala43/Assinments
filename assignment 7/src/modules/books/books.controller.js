import { Router } from "express";
import { db } from "../../DB/connection.js";
import { bsonType } from "bson";
import { title } from "process";

const booksRouter = Router();

booksRouter.post("/", async (req, res) => {
  try {
    await db.createCollection("books", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["title"],
          properties: {
            title: {
              bsonType: "string",
            },
          },
        },
      },
    });
    res.status(201).json({ ok: 1 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

booksRouter.post("/index", async (req, res) => {
  try {
    const result = await db.collection("books").createIndex({ title: 1 });
    res.status(201).json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

booksRouter.post("/insert", async (req, res) => {
  try {
    const result = await db.collection("books").insertOne(req.body);
    res.status(201).json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

booksRouter.post("/batch", async (req, res) => {
  try {
    const result = await db.collection("books").insertMany(req.body);
    res.status(201).json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

booksRouter.patch("/:title", async (req, res) => {
  try {
    const result = await db.collection("books").updateOne(
      { title: req.params.title },
      {
        $set: {
          year: new Date().getFullYear(),
        },
      },
    );

    res.status(201).json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

booksRouter.get("/title", async (req, res) => {
  try {
    const result = await db
      .collection("books")
      .findOne({ title: req.query.title });
    res.status(201).json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

booksRouter.get("/year", async (req, res) => {
  try {
    const { from, to } = req.query;
    const result = await db
      .collection("books")
      .find({ year: { $gte: Number(from), $lte: Number(to) } })
      .toArray();
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

booksRouter.get("/genre", async (req, res) => {
  try {
    const { genre } = req.query;
    const result = await db.collection("books").find({ genre }).toArray();
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

booksRouter.get("/skip-limit", async (req, res) => {
  try {
    const result = await db
      .collection("books")
      .find()
      .sort({ year: -1 })
      .skip(2)
      .limit(3)
      .toArray();
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

booksRouter.get("/year-integer", async (req, res) => {
  try {
    const result = await db
      .collection("books")
      .find({ year: { $type: "int" } })
      .toArray();
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

booksRouter.get("/exclude-genres", async (req, res) => {
  try {
    const result = await db
      .collection("books")
      .find({
        genre: {
          $nin: [
            ["dystopian", "science fiction"],
            ["classic", "fiction"],
            ["science fiction"],
            ["fantasy", "adventure"],
          ],
        },
      })
      .toArray();
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

booksRouter.delete("/before-year", async (req, res) => {
  try {
    const { year } = req.query;
    const result = await db
      .collection("books")
      .deleteMany({ year: { $lt: Number(year) } });
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

booksRouter.get("/aggregate1", async (req, res) => {
  try {
    const result = await db
      .collection("books")
      .aggregate([
        {
          $match: {
            year: { $gt: 2000 },
          },
        },
        {
          $sort: {
            year: -1,
          },
        },
      ])
      .toArray();
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

booksRouter.get("/aggregate2", async (req, res) => {
  try {
    const result = await db
      .collection("books")
      .aggregate([
        { $match: { year: { $gt: 2000 } } },
        { $project: { _id: 0, title: 1, author: 1, year: 1 } },
      ])
      .toArray();
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

booksRouter.get("/aggregate3", async (req, res) => {
  try {
    const result = await db
      .collection("books")
      .aggregate([{ $unwind: "$genre" }])
      .toArray();
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



export default booksRouter;
