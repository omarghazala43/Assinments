const fs = require("fs");
const express = require("express");

const app = express();
app.use(express.json());

function getUsers() {
  return JSON.parse(fs.readFileSync("./users.json", "utf-8"));
}

function writeUsersFile(users) {
  fs.writeFileSync("./users.json", JSON.stringify(users, null, 2));
}

// Q1

app.post("/user", (req, res) => {
  const newUser = req.body;

  const users = getUsers();

  const emailExist = users.find((user) => user.email === newUser.email);

  if (emailExist) {
    res.status(400).json({ message: "Email already exists." });
  } else {
    users.push(newUser);
    writeUsersFile(users);
    res.status(201).json({ message: "User added successfully." });
  }
});

// Q2

app.patch("/user/:id", (req, res) => {
  const users = getUsers();
  let updatedUser = req.body;
  const userID = req.params.id;

  const wantedUser = users.find((user) => user.id === Number(userID));
  if (!wantedUser) {
    return res.status(404).json({ message: "user not found" });
  }

  if (updatedUser.name) wantedUser.name = updatedUser.name;
  if (updatedUser.age) wantedUser.age = updatedUser.age;
  if (updatedUser.email) {
    const emailExist = users.find((user) => user.email === updatedUser.email);

    if (emailExist) {
      res.status(400).json({ message: "user already exist" });
    } else {
      wantedUser.email = updatedUser.email;
    }
  }
  writeUsersFile(users);
  res.status(200).json({ message: "user updated successfully" });
});

// Q3

app.delete("/user{/:id}", (req, res) => {
  const userID = req.params.id || req.body.id;
  const users = getUsers();
  const wantedUser = users.find((user) => user.id === Number(userID));
  if (!wantedUser) {
    return res.status(404).json({ message: "User not found" });
  }

  const newUsers = users.filter((user) => user.id != Number(userID));
  writeUsersFile(newUsers);
  res.status(200).json({ message: "User deleted successfully" });
});

// Q4

app.get("/user/getByName", (req, res) => {
  const users = getUsers();
  const { name } = req.query;

  const user = users.find((user) => user.name === name);
  if (!user) {
    return res.status(404).json("User not found");
  }
  res.status(200).json(user);
});

// Q5

app.get("/user", (req, res) => {
  const users = getUsers();
  res.status(200).json(users);
});

// Q6

app.get("/user/filter", (req, res) => {
  const users = getUsers();
  const { minAge } = req.query;

  const filteredUsers = users.filter((user) => user.age >= Number(minAge));
  if (filteredUsers.length === 0) {
    return res.status(404).json({ message: "No users found" });
  }
  res.status(200).json(filteredUsers);
});

// Q7

app.get("/user/:id", (req, res) => {
  const users = getUsers();
  const id = req.params.id;

  const wantedUser = users.find((user) => user.id === Number(id));
  if (!wantedUser) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json(wantedUser);
});

app.listen(8000, () => {
  console.log("Server running on port 8000");
});
