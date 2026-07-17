import { Router } from "express";
import User from "../../DB/models/users.model.js";

const userRouter = Router();

userRouter.post("/signup", async (req, res) => {
  try {
    const { email } = req.body;

    const existingUser = await User.findOne({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({
        message: "Email already exists",
      });
    }

    const user = User.build(req.body);
    await user.save();

    res.status(201).json({ message: "user created successfully", user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

userRouter.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await User.upsert(
      {
        id,
        ...req.body,
      },
      {
        validate: false,
      },
    );
    res.status(200).json({ message: "User created or updated successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

userRouter.get("/by-email", async (req, res) => {
  try {
    const { email } = req.query;
    const user = await User.findOne({
      where: { email },
    });

    if (!user) return res.status(404).json({ message: "no user found" });

    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

userRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      attributes: {
        exclude: ["role"],
      },
    });
    if (!user) return res.status(404).json({ message: "no user found" });

    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default userRouter;
