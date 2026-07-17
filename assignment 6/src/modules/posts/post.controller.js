import { Router } from "express";
import Post from "../../DB/models/posts.model.js";
import User from "../../DB/models/users.model.js";
import Comment from "../../DB/models/comments.model.js";
import { fn, col } from "sequelize";

const postRouter = Router();

postRouter.post("/", async (req, res) => {
  try {
    const post = new Post(req.body);
    await post.save();

    res.status(201).json({ message: "Post created successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

postRouter.delete("/:postId", async (req, res) => {
  try {
    const postId = Number(req.params.postId);
    const { userId } = req.body;

    const post = await Post.findByPk(postId);

    if (!post) return res.status(404).json({ message: "post not found" });

    if (post.userId !== userId)
      return res.status(403).json({ message: "You are not authorized" });

    await post.destroy();

    res.status(200).json({ message: "Post deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

postRouter.get("/details", async (req, res) => {
  try {
    const posts = await Post.findAll({
      attributes: ["id", "title"],

      include: [
        {
          model: User,
          attributes: ["id", "name"],
        },
        {
          model: Comment,
          attributes: ["id", "content"],
        },
      ],
    });

    res.status(200).json({
      posts,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});


postRouter.get("/comment-count", async (req, res) => {
  try {
    const posts = await Post.findAll({
      attributes: [
        "id",
        "title",
        [fn("COUNT", col("Comments.id")), "commentsCount"],
      ],
      include: [
        {
          model: Comment,
          attributes: [],
        },
      ],
      group: ["Post.id"],
    });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

export default postRouter;
