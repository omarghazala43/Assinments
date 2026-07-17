import sequelize from "./DB/connection.js";
import express from "express";
import Comment from "./DB/models/comments.model.js";
import Post from "./DB/models/posts.model.js";
import User from "./DB/models/users.model.js";
import userRouter from "./modules/users/user.controller.js";
import postRouter from "./modules/posts/post.controller.js";
import commentRouter from "./modules/comments/comment.controller.js";

async function bootstrap() {
  const app = express();
  app.use(express.json());

  app.use("/users", userRouter);
  app.use("/posts", postRouter);
  app.use("/comments", commentRouter);

  User.hasMany(Post, { foreignKey: "userId" });
  Post.belongsTo(User, { foreignKey: "userId" });

  User.hasMany(Comment, { foreignKey: "userId" });
  Comment.belongsTo(User, { foreignKey: "userId" });

  Post.hasMany(Comment, { foreignKey: "postId" });
  Comment.belongsTo(Post, { foreignKey: "postId" });

  try {
    await sequelize.authenticate();
    await sequelize.sync({
      alter: true,
    });
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }

  app.listen(8000, () => {
    console.log("Server running on port 8000");
  });
}
export default bootstrap;
