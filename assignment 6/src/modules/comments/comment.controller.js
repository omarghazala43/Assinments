import { Router } from "express";
import { Op } from "sequelize";
import Comment from "../../DB/models/comments.model.js";
import User from "../../DB/models/users.model.js";
import Post from "../../DB/models/posts.model.js";

const commentRouter = Router();

commentRouter.post("/", async (req, res) => {
  try {
    const comments = await Comment.bulkCreate(req.body);

    res.status(201).json({
      message: "Comments created successfully",
      comments,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

commentRouter.put("/:commentId", async (req, res) => {
  try {
    const { commentId } = req.params;
    const { userId, content } = req.body;

    const comment = await Comment.findByPk(commentId);

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    if (comment.userId !== userId) {
      return res.status(403).json({
        message: "You are not the owner of this comment",
      });
    }

    comment.content = content;
    await comment.save();

    res.status(200).json({
      message: "Comment updated successfully",
      comment,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

commentRouter.post("/find-or-create", async (req, res) => {
  try {
    const [comment, created] = await Comment.findOrCreate({
      where: {
        postId: req.body.postId,
        userId: req.body.userId,
        content: req.body.content,
      },
      defaults: req.body,
    });

    res.status(200).json({
      created,
      comment,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

commentRouter.get("/search", async (req, res) => {
  try {
    const { word } = req.query;

    const comments = await Comment.findAll({
      where: {
        content: {
          [Op.like]: `%${word}%`,
        },
      },
    });

    const count = await Comment.count({
      where: {
        content: {
          [Op.like]: `%${word}%`,
        },
      },
    });

    res.status(200).json({
      count,
      comments,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

commentRouter.get("/newest/:postId", async (req, res) => {
  try {
    const comments = await Comment.findAll({
      where: {
        postId: req.params.postId,
      },
      order: [["createdAt", "DESC"]],
      limit: 3,
    });

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

commentRouter.get("/details/:id", async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id, {
      include: [
        {
          model: User,
        },
        {
          model: Post,
        },
      ],
    });

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

export default commentRouter;
